class TelegramNotifier {
    constructor(token, chatId) {
        this.token = token;
        this.chatId = chatId;
        this.apiUrl = `https://api.telegram.org/bot${token}`;
    }

    async sendMessage(message) {
        try {
            const response = await fetch(`${this.apiUrl}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: this.chatId,
                    text: message,
                    parse_mode: 'HTML'
                })
            });

            const result = await response.json();
            if (result.ok) {
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

const telegramNotifier = new TelegramNotifier('8350395305:AAFKW8BU_nZEKMN1tRjA8SyqTq5ZSHUwTtQ', '455532741');

window.telegramNotifier = telegramNotifier;