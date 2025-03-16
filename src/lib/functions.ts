export const FormatDate = ({ children }: { children: string }) => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    const date = new Date(children);
    const dayName = days[date.getUTCDay()];
    const day = date.getUTCDate();
    const monthName = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    return `${dayName} ${day} ${monthName} ${year}`;
}

