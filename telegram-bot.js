class TelegramNotifier {
    constructor() {
        // Vercel API 엔드포인트 URL (배포 후 실제 URL로 변경 필요)
        this.apiUrl = '/api/telegram'; // Vercel 배포 시 자동으로 라우팅됨
    }

    async sendMessage(message) {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message
                })
            });

            const result = await response.json();
            if (result.success) {
                console.log('메시지 전송 성공:', result);
                return true;
            } else {
                console.error('메시지 전송 실패:', result);
                return false;
            }
        } catch (error) {
            console.error('텔레그램 API 오류:', error);
            return false;
        }
    }

    async sendOrderNotification(orderData) {
        const message = `
🚀 <b>새로운 주문이 접수되었습니다!</b>

📋 <b>주문 정보:</b>
• 서비스: ${orderData.service}
• 채널 링크: ${orderData.channel}
• 수량: ${orderData.quantity}
• 예상 금액: ${orderData.price}
• 주문 시간: ${new Date().toLocaleString('ko-KR')}

💡 주문 처리를 시작해주세요!
        `.trim();

        return await this.sendMessage(message);
    }
}

const telegramNotifier = new TelegramNotifier();

window.telegramNotifier = telegramNotifier;