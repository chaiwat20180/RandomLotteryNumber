$(document).ready(function() {
    let count = 0; // ตัวนับสำหรับลำดับเลข
    let historyData = []; // เก็บประวัติเลขที่สุ่ม
    $('#currentYear').text(`2024 - ${new Date().getFullYear()}`); 
    const SetTimeAnimation = 300;

    $('#generate').click(function() {
        let numbers = [];
        let index = 0;
        $('.reel').empty(); 

        function generateNumber() {
            if (index < 6) {
                let randomNum = Math.floor(Math.random() * 10);
                let $currentReel = $(`#reel${index + 1}`);
                $currentReel.html(`<div class="number">${randomNum}</div>`).children().css('transform', 'translateY(-100%)');

                setTimeout(() => {
                    $currentReel.children().css('transform', 'translateY(0)');
                }, SetTimeAnimation - 100);

                numbers.push(randomNum);
                index++;
                setTimeout(generateNumber, SetTimeAnimation);
            } else {
                //เพิ่มเลขที่สุ่มได้ลงในประวัติ
                let lotteryNumber = numbers.join('');
                let bgColorClass = count % 2 === 0 ? 'bg-color-1' : 'bg-color-2'; // สลับสีพื้นหลัง
                count++;
                setTimeout(() => {
                    historyData.push(`เลขที่สุ่มได้ครั้งที่ ${count} : ${lotteryNumber}`);
                    $('#history').prepend(`<li class="list-group-item ${bgColorClass}"><span>สุ่มครั้งที่ ${count} เลขที่สุ่มได้ : </span> ${lotteryNumber}</li>`);
                }, 500);
            }
        }

        generateNumber();
    });

    const formatDate = (date) => `${String(date.getDate()).padStart(2, '0')}_${String(date.getMonth() + 1).padStart(2, '0')}_${date.getFullYear()}`;
    const formatDateTime = (date) => date.toLocaleString('th-TH');

    // ฟังก์ชันสำหรับส่ง Export TXT
    $('#export').click(function() {
        const currentDate = new Date();
        const formattedDate = formatDate(currentDate);
        const header = `ประวัติการสุ่มเลขล็อตเตอรี่\nวันที่: ${formatDateTime(currentDate)}\n\n`;
        const dataStr = header + historyData.join('\n');
    
        const blob = new Blob([dataStr], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        //สร้างลิงก์ดาวน์โหลด
        const $a = $('<a></a>')
            .attr('href', url)
            .attr('download', `lottery_history_${formattedDate}.txt`)
            .appendTo('body'); // เพิ่มลิงก์ลงใน body
    
        $a[0].click(); // คลิกเพื่อดาวน์โหลด
        $a.remove(); // ลบลิงก์หลังจากดาวน์โหลด
    });

    // ฟังก์ชันสำหรับ Reset
    $('#reset').click(function() {
        count = 0;
        historyData = []; 
        $('#history').empty(); 
        $('.reel').empty(); 
    });
});