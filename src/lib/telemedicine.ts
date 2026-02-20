export class TelemedicineProvider {
    /**
     * Generates a unique Jitsi Meet room URL.
     * Jitsi is a free, open-source video conferencing tool that requires no account.
     */
    static generateJitsiRoom(appointmentId: string): string {
        const baseUrl = "https://meet.jit.si";
        const roomName = `DrAbuHanif-Consultation-${appointmentId}`;
        return `${baseUrl}/${roomName}`;
    }
}
