# 텔레그램 알림 설정 가이드

## 문제
브라우저에서 직접 텔레그램 API를 호출하면 CORS 에러가 발생합니다.

## 해결 방법

### 방법 1: Google Apps Script 사용 (추천)

1. [Google Apps Script](https://script.google.com) 접속
2. 새 프로젝트 생성
3. 다음 코드 붙여넣기:

```javascript
function doPost(e) {
  const data = JSON.parse(e.postData.contents);

  const token = '8350395305:AAFKW8BU_nZEKMN1tRjA8SyqTq5ZSHUwTtQ';
  const chatId = '455532741';

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  const payload = {
    'chat_id': chatId,
    'text': data.message,
    'parse_mode': 'HTML'
  };

  const options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(payload)
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    return ContentService.createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. 배포 > 새 배포
5. 유형: 웹 앱
6. 액세스 권한: 모든 사용자
7. 배포 후 생성된 URL 복사

### 방법 2: 무료 백엔드 서비스 사용

#### Vercel 사용
1. `api/telegram.js` 파일 생성:

```javascript
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  const token = '8350395305:AAFKW8BU_nZEKMN1tRjA8SyqTq5ZSHUwTtQ';
  const chatId = '455532741';

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML'
      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

2. Vercel에 배포
3. 생성된 URL 사용

### 방법 3: Netlify Functions 사용

1. `netlify/functions/telegram.js` 파일 생성:

```javascript
exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    };
  }

  const { message } = JSON.parse(event.body);

  const token = '8350395305:AAFKW8BU_nZEKMN1tRjA8SyqTq5ZSHUwTtQ';
  const chatId = '455532741';

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML'
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
```

2. Netlify에 배포
3. 생성된 Function URL 사용

## telegram-bot.js 수정

위 방법 중 하나를 선택하여 배포한 후, `telegram-bot.js` 파일을 다음과 같이 수정:

```javascript
async sendMessage(message) {
    try {
        // Google Apps Script 또는 다른 백엔드 URL로 교체
        const webhookUrl = 'YOUR_WEBHOOK_URL_HERE';

        const response = await fetch(webhookUrl, {
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
        console.error('웹훅 오류:', error);
        return false;
    }
}
```

## 임시 해결책: 이메일 알림

텔레그램 대신 이메일 알림을 사용하려면 EmailJS 서비스를 사용할 수 있습니다:

1. [EmailJS](https://www.emailjs.com/) 가입
2. 서비스 생성 및 템플릿 설정
3. HTML에 EmailJS SDK 추가
4. 주문 시 이메일 전송

이 방법들 중 하나를 선택하여 구현하면 텔레그램 알림이 정상적으로 작동합니다.