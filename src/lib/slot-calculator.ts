import { addMinutes, format, isAfter, isBefore, parse, startOfDay } from "date-fns";
import { formatInTimeZone, toDate } from "date-fns-tz";

const TIMEZONE = "Asia/Dhaka";

export interface Slot {
  startTime: string; // "HH:mm"
  endTime: string;
  isAvailable: boolean;
}

interface Availability {
  startTime: string;
  endTime: string;
}

/**
 * Calculates available slots for a given date.
 */
export function calculateSlots(
  date: Date,
  rules: { dayOfWeek: number; startTime: string; endTime: string }[],
  exceptions: { date: Date; isAvailable: boolean; startTime?: string | null; endTime?: string | null }[],
  existingAppointments: { startTime: string; endTime: string }[],
  slotDuration: number = 30
): Slot[] {
  const dayOfWeek = date.getDay();
  const dateStr = format(date, "yyyy-MM-dd");

  // 1. Check exceptions
  const exception = exceptions.find(
    (e) => format(e.date, "yyyy-MM-dd") === dateStr
  );

  let activeAvailability: Availability[] = [];

  if (exception) {
    if (!exception.isAvailable) {
      return []; // Doctor is off
    }
    if (exception.startTime && exception.endTime) {
      activeAvailability.push({
        startTime: exception.startTime,
        endTime: exception.endTime,
      });
    } else {
      // If exception says available but no hours, check rules
      activeAvailability = rules
        .filter((r) => r.dayOfWeek === dayOfWeek)
        .map((r) => ({ startTime: r.startTime, endTime: r.endTime }));
    }
  } else {
    // 2. Use weekly rules
    activeAvailability = rules
      .filter((r) => r.dayOfWeek === dayOfWeek)
      .map((r) => ({ startTime: r.startTime, endTime: r.endTime }));
  }

  if (activeAvailability.length === 0) return [];

  const slots: Slot[] = [];
  const now = toDate(new Date(), { timeZone: TIMEZONE });
  const isToday = dateStr === formatInTimeZone(now, TIMEZONE, "yyyy-MM-dd");

  activeAvailability.forEach((range) => {
    let current = parse(range.startTime, "HH:mm", date);
    const end = parse(range.endTime, "HH:mm", date);

    while (isBefore(addMinutes(current, slotDuration), end) || format(addMinutes(current, slotDuration), "HH:mm") === range.endTime) {
      const slotStartStr = format(current, "HH:mm");
      const slotEndStr = format(addMinutes(current, slotDuration), "HH:mm");

      // Check if slot is in the past
      let isPast = false;
      if (isToday) {
        const slotDateTime = parse(slotStartStr, "HH:mm", now);
        if (isBefore(slotDateTime, now)) {
          isPast = true;
        }
      }

      // Check if slot overlaps with existing appointments
      const isBooked = existingAppointments.some((app) => {
        return (
          (slotStartStr >= app.startTime && slotStartStr < app.endTime) ||
          (slotEndStr > app.startTime && slotEndStr <= app.endTime)
        );
      });

      slots.push({
        startTime: slotStartStr,
        endTime: slotEndStr,
        isAvailable: !isPast && !isBooked,
      });

      current = addMinutes(current, slotDuration);
    }
  });

  return slots;
}
