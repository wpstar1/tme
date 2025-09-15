// EmailJS를 사용한 이메일 알림 시스템
// 먼저 https://www.emailjs.com/ 에서 계정을 만들고 서비스를 설정해야 합니다

class EmailNotifier {
    constructor() {
        // EmailJS 설정 (실제 값으로 교체 필요)
        this.serviceId = 'YOUR_SERVICE_ID'; // EmailJS에서 생성한 서비스 ID
        this.templateId = 'YOUR_TEMPLATE_ID'; // EmailJS에서 생성한 템플릿 ID
        this.publicKey = 'YOUR_PUBLIC_KEY'; // EmailJS 퍼블릭 키
    }

    async sendOrderNotification(orderData) {
        // EmailJS SDK가 로드되었는지 확인
        if (typeof emailjs === 'undefined') {
            console.error('EmailJS SDK가 로드되지 않았습니다.');
            return false;
        }

        const templateParams = {
            to_email: 'your-email@example.com', // 알림을 받을 이메일 주소
            service: orderData.service,
            channel: orderData.channel,
            quantity: orderData.quantity,
            price: orderData.price,
            order_time: new Date().toLocaleString('ko-KR'),
            message: `
                새로운 주문이 접수되었습니다!

                서비스: ${orderData.service}
                채널 링크: ${orderData.channel}
                수량: ${orderData.quantity}
                예상 금액: ${orderData.price}
                주문 시간: ${new Date().toLocaleString('ko-KR')}
            `
        };

        try {
            const response = await emailjs.send(
                this.serviceId,
                this.templateId,
                templateParams,
                this.publicKey
            );
            console.log('이메일 전송 성공:', response);
            return true;
        } catch (error) {
            console.error('이메일 전송 실패:', error);
            return false;
        }
    }
}

// 사용 방법:
// 1. index.html에 EmailJS SDK 추가:
// <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

// 2. EmailNotifier 초기화:
// const emailNotifier = new EmailNotifier();

// 3. script.js에서 주문 확인 시 호출:
// await emailNotifier.sendOrderNotification(orderData);