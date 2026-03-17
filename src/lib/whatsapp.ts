/**
 * Generates a WhatsApp redirect URL with a prefilled message.
 * @param number - The WhatsApp number in international format (e.g., 8801XXXXXXXXX)
 * @param message - The message to be prefilled
 * @returns The formatted WhatsApp URL
 */
export const getWhatsAppUrl = (number?: string, message?: string) => {
    const defaultNumber = "8801673129528";
    const phoneNumber = number || defaultNumber;
    const encodedMessage = message ? encodeURIComponent(message) : "";

    return `https://wa.me/${phoneNumber}${encodedMessage ? `?text=${encodedMessage}` : ""}`;
};

export const WHATSAPP_MESSAGE_TEMPLATE = `ডা. আবু হানিফ স্যারের অ্যাপয়েন্টমেন্ট নিতে চাই। অনুগ্রহ করে বিস্তারিত জানাবেন।`;

