document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navAuth = document.querySelector('.nav-auth');
    
    hamburger?.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu?.classList.toggle('active');
        navAuth?.classList.toggle('active');
    });

    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar?.classList.add('hidden');
        } else {
            navbar?.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop;
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const services = {
        '텔레그램 구독자 증가': {
            1000: 35000,
            2000: 65000,
            3000: 93000,
            4000: 120000,
            5000: 145000,
            6000: 168000,
            7000: 189000,
            8000: 208000,
            9000: 225000,
            10000: 240000
        },
        '텔레그램 조회수 증가': {
            100: 1000,
            500: 4500,
            1000: 8000,
            2000: 15000
        },
        '텔레그램 랜덤반응 증가': {
            10: 1000,
            50: 4500,
            100: 8000,
            500: 35000,
            1000: 65000
        },
        '텔레그램 신고[채널/그룹]': {
            10: 35000,
            25: 80000,
            50: 150000,
            100: 280000,
            200: 520000,
            500: 1200000
        }
    };

    const serviceInfo = {
        '텔레그램 구독자 증가': {
            minQuantity: 1000,
            completionTime: '12시간',
            description: '실제 활성 사용자로 구독자 증가'
        },
        '텔레그램 조회수 증가': {
            minQuantity: 100,
            completionTime: '1-3시간',
            description: '빠른 조회수 증가'
        },
        '텔레그램 랜덤반응 증가': {
            minQuantity: 10,
            completionTime: '1-3시간',
            description: '다양한 이모지 반응으로 게시물 참여도 증가'
        },
        '텔레그램 신고[채널/그룹]': {
            minQuantity: 10,
            completionTime: '24-48시간',
            description: 'Premium 계정을 통한 대량 신고'
        }
    };

    const serviceSelect = document.querySelector('select.form-control');
    const quantityInput = document.querySelector('input[type="number"]');
    const quantitySelectGroup = document.querySelector('#quantity-select-group');
    const quantityInputGroup = document.querySelector('#quantity-input-group');
    const reportQuantitySelectGroup = document.querySelector('#report-quantity-select-group');
    const viewQuantitySelectGroup = document.querySelector('#view-quantity-select-group');
    const reactionQuantitySelectGroup = document.querySelector('#reaction-quantity-select-group');
    const quantityDropdown = document.querySelector('#quantity-select');
    const reportQuantityDropdown = document.querySelector('#report-quantity-select');
    const viewQuantityDropdown = document.querySelector('#view-quantity-select');
    const reactionQuantityDropdown = document.querySelector('#reaction-quantity-select');
    const priceDisplay = document.querySelector('.price-amount');
    const reportNotice = document.querySelector('#report-notice');
    const reactionNotice = document.querySelector('#reaction-notice');
    const serviceInfoDiv = document.querySelector('#service-info');
    const completionTimeSpan = document.querySelector('#completion-time');
    const quantityHint = document.querySelector('#quantity-hint');

    function handleServiceChange() {
        const selectedService = serviceSelect.value;

        // Show/hide notices based on service
        if (selectedService === '텔레그램 신고[채널/그룹]') {
            reportNotice.style.display = 'block';
            reactionNotice.style.display = 'none';
        } else if (selectedService === '텔레그램 랜덤반응 증가') {
            reportNotice.style.display = 'none';
            reactionNotice.style.display = 'block';
        } else {
            reportNotice.style.display = 'none';
            reactionNotice.style.display = 'none';
        }

        // Hide all selection groups first
        if (quantitySelectGroup) quantitySelectGroup.style.display = 'none';
        if (quantityInputGroup) quantityInputGroup.style.display = 'none';
        if (reportQuantitySelectGroup) reportQuantitySelectGroup.style.display = 'none';
        if (viewQuantitySelectGroup) viewQuantitySelectGroup.style.display = 'none';
        if (reactionQuantitySelectGroup) reactionQuantitySelectGroup.style.display = 'none';

        // Show appropriate selection method based on service
        if (selectedService === '텔레그램 구독자 증가') {
            // Show dropdown for subscriber increase
            if (quantitySelectGroup) quantitySelectGroup.style.display = 'block';

            // Show service info
            if (serviceInfoDiv) serviceInfoDiv.style.display = 'block';
            if (completionTimeSpan) {
                completionTimeSpan.textContent = serviceInfo[selectedService].completionTime;
            }

            // Reset dropdown selection
            if (quantityDropdown) {
                quantityDropdown.value = '';
            }
        } else if (selectedService === '텔레그램 신고[채널/그룹]') {
            // Show report dropdown for report service
            if (reportQuantitySelectGroup) reportQuantitySelectGroup.style.display = 'block';

            // Hide service info for report service
            if (serviceInfoDiv) serviceInfoDiv.style.display = 'none';

            // Reset dropdown selection
            if (reportQuantityDropdown) {
                reportQuantityDropdown.value = '';
            }
        } else if (selectedService === '텔레그램 조회수 증가') {
            // Show view dropdown for view service
            if (viewQuantitySelectGroup) viewQuantitySelectGroup.style.display = 'block';

            // Hide service info for view service
            if (serviceInfoDiv) serviceInfoDiv.style.display = 'none';

            // Reset dropdown selection
            if (viewQuantityDropdown) {
                viewQuantityDropdown.value = '';
            }
        } else if (selectedService === '텔레그램 랜덤반응 증가') {
            // Show reaction dropdown for reaction service
            if (reactionQuantitySelectGroup) reactionQuantitySelectGroup.style.display = 'block';

            // Hide service info for reaction service
            if (serviceInfoDiv) serviceInfoDiv.style.display = 'none';

            // Reset dropdown selection
            if (reactionQuantityDropdown) {
                reactionQuantityDropdown.value = '';
            }
        } else {
            // Show input for other services (none currently)
            if (quantityInputGroup) quantityInputGroup.style.display = 'block';

            // Hide service info for other services
            if (serviceInfoDiv) serviceInfoDiv.style.display = 'none';

            // Update service info and minimum quantity for other services
            if (serviceInfo[selectedService]) {
                const info = serviceInfo[selectedService];

                // Update minimum quantity
                quantityInput.min = info.minQuantity;
                quantityInput.placeholder = info.minQuantity.toString();

                // Update quantity hint
                if (quantityHint) {
                    quantityHint.textContent = `최소 주문 수량: ${info.minQuantity.toLocaleString()}개`;
                }

                // Reset quantity if below minimum
                if (quantityInput.value && parseInt(quantityInput.value) < info.minQuantity) {
                    quantityInput.value = '';
                }
            }
        }

        calculatePrice();
    }
    
    function calculatePrice() {
        if (!serviceSelect || !priceDisplay) return;

        const selectedService = serviceSelect.value;

        if (selectedService === '텔레그램 구독자 증가') {
            // For subscriber increase, use dropdown value
            if (quantityDropdown && quantityDropdown.value) {
                const selectedOption = quantityDropdown.options[quantityDropdown.selectedIndex];
                const price = parseInt(selectedOption.getAttribute('data-price')) || 0;
                priceDisplay.textContent = `₩${price.toLocaleString()}`;
            } else {
                priceDisplay.textContent = '₩0';
            }
        } else if (selectedService === '텔레그램 신고[채널/그룹]') {
            // For report service, use report dropdown value
            if (reportQuantityDropdown && reportQuantityDropdown.value) {
                const selectedOption = reportQuantityDropdown.options[reportQuantityDropdown.selectedIndex];
                const price = parseInt(selectedOption.getAttribute('data-price')) || 0;
                priceDisplay.textContent = `₩${price.toLocaleString()}`;
            } else {
                priceDisplay.textContent = '₩0';
            }
        } else if (selectedService === '텔레그램 조회수 증가') {
            // For view service, use view dropdown value
            if (viewQuantityDropdown && viewQuantityDropdown.value) {
                const selectedOption = viewQuantityDropdown.options[viewQuantityDropdown.selectedIndex];
                const price = parseInt(selectedOption.getAttribute('data-price')) || 0;
                priceDisplay.textContent = `₩${price.toLocaleString()}`;
            } else {
                priceDisplay.textContent = '₩0';
            }
        } else if (selectedService === '텔레그램 랜덤반응 증가') {
            // For reaction service, use reaction dropdown value
            if (reactionQuantityDropdown && reactionQuantityDropdown.value) {
                const selectedOption = reactionQuantityDropdown.options[reactionQuantityDropdown.selectedIndex];
                const price = parseInt(selectedOption.getAttribute('data-price')) || 0;
                priceDisplay.textContent = `₩${price.toLocaleString()}`;
            } else {
                priceDisplay.textContent = '₩0';
            }
        } else {
            // For other services, use input value
            const quantity = parseInt(quantityInput.value) || 0;

            if (services[selectedService] && quantity > 0) {
                let price = 0;
                const servicePricing = services[selectedService];
                const quantities = Object.keys(servicePricing).map(Number).sort((a, b) => b - a);

                for (let q of quantities) {
                    if (quantity >= q) {
                        const unitPrice = servicePricing[q] / q;
                        price = Math.round(quantity * unitPrice);
                        break;
                    }
                }

                if (price === 0 && quantity < Math.min(...quantities)) {
                    const minQuantity = Math.min(...quantities);
                    const unitPrice = servicePricing[minQuantity] / minQuantity;
                    price = Math.round(quantity * unitPrice * 1.5);
                }

                priceDisplay.textContent = `₩${price.toLocaleString()}`;
            } else {
                priceDisplay.textContent = '₩0';
            }
        }
    }

    serviceSelect?.addEventListener('change', handleServiceChange);
    quantityInput?.addEventListener('input', calculatePrice);
    quantityDropdown?.addEventListener('change', calculatePrice);
    reportQuantityDropdown?.addEventListener('change', calculatePrice);
    viewQuantityDropdown?.addEventListener('change', calculatePrice);
    reactionQuantityDropdown?.addEventListener('change', calculatePrice);

    // Initialize on page load
    if (serviceSelect) {
        handleServiceChange();
    }

    const orderForm = document.querySelector('form.order-form-content');
    const orderBtn = document.getElementById('order-submit-btn');
    const modal = document.getElementById('payment-modal');
    const closeBtn = document.querySelector('.close');
    const copyBtn = document.getElementById('copy-account');
    const confirmBtn = document.getElementById('confirm-payment');
    const cancelBtn = document.getElementById('cancel-order');

    // 디버깅용 로그
    console.log('Order form found:', orderForm);
    console.log('Order button found:', orderBtn);
    console.log('Modal element:', modal);

    // 주문 처리 함수
    async function processOrder(e) {
        if (e) e.preventDefault();
        console.log('Processing order...');

        try {
            const telegramLink = document.getElementById('telegram-link')?.value;
            const serviceSelectForm = document.querySelector('select.form-control');
            const selectedService = serviceSelectForm?.value;
            const priceDisplayForm = document.querySelector('.price-amount');
            let quantity;

        // Get quantity based on service type
        const quantityDropdownForm = document.querySelector('#quantity-select');
        const reportQuantityDropdownForm = document.querySelector('#report-quantity-select');
        const viewQuantityDropdownForm = document.querySelector('#view-quantity-select');
        const reactionQuantityDropdownForm = document.querySelector('#reaction-quantity-select');

        if (selectedService === '텔레그램 구독자 증가') {
            quantity = quantityDropdownForm?.value;
            if (!quantity) {
                alert('수량을 선택해주세요.');
                return;
            }
        } else if (selectedService === '텔레그램 신고[채널/그룹]') {
            quantity = reportQuantityDropdownForm?.value;
            if (!quantity) {
                alert('신고 수량을 선택해주세요.');
                return;
            }
        } else if (selectedService === '텔레그램 조회수 증가') {
            quantity = viewQuantityDropdownForm?.value;
            if (!quantity) {
                alert('조회수 수량을 선택해주세요.');
                return;
            }
        } else if (selectedService === '텔레그램 랜덤반응 증가') {
            quantity = reactionQuantityDropdownForm?.value;
            if (!quantity) {
                alert('반응 수량을 선택해주세요.');
                return;
            }
        } else {
            quantity = document.getElementById('quantity')?.value;
            if (!quantity) {
                alert('수량을 입력해주세요.');
                return;
            }
        }

        if (!telegramLink) {
            alert('텔레그램 링크를 입력해주세요.');
            return;
        }

        const formData = {
            service: selectedService,
            channel: telegramLink,
            quantity: quantity,
            price: priceDisplayForm?.textContent
        };

        // Update modal content
        document.getElementById('modal-service').textContent = formData.service;
        document.getElementById('modal-link').textContent = formData.channel;
        document.getElementById('modal-quantity').textContent = formData.quantity;
        document.getElementById('modal-amount').textContent = formData.price;

        // Show modal
        modal.style.display = 'block';

        // Store form data for later use
        window.currentOrderData = formData;
        } catch (error) {
            console.error('Error in order processing:', error);
            alert('주문 처리 중 오류가 발생했습니다: ' + error.message);
        }
    }

    // 폼 제출 이벤트
    if (orderForm) {
        orderForm.addEventListener('submit', processOrder);
    }

    // 버튼 클릭 이벤트 (폴백)
    if (orderBtn) {
        orderBtn.addEventListener('click', processOrder);
        console.log('Order button click event attached');
    } else {
        console.error('Order button not found!');
    }

    // Modal close handlers
    closeBtn?.addEventListener('click', function() {
        modal.style.display = 'none';
        // 모달 닫을 때 폼 리셋
        if (orderForm) {
            orderForm.reset();
        }
        const priceDisplayElement = document.querySelector('.price-amount');
        if (priceDisplayElement) {
            priceDisplayElement.textContent = '₩0';
        }
    });

    cancelBtn?.addEventListener('click', function() {
        modal.style.display = 'none';
        // 모달 닫을 때 폼 리셋
        if (orderForm) {
            orderForm.reset();
        }
        const priceDisplayElement = document.querySelector('.price-amount');
        if (priceDisplayElement) {
            priceDisplayElement.textContent = '₩0';
        }
    });

    // Copy account number
    copyBtn?.addEventListener('click', function() {
        const accountNumber = '3333335201265';
        navigator.clipboard.writeText(accountNumber).then(function() {
            showNotification('계좌번호가 복사되었습니다!', 'success');
            copyBtn.innerHTML = '<i class="fas fa-check"></i> 복사 완료';
            setTimeout(() => {
                copyBtn.innerHTML = '<i class="fas fa-copy"></i> 계좌번호 복사';
            }, 2000);
        }).catch(function(err) {
            showNotification('복사 실패: ' + err, 'error');
        });
    });

    // Confirm payment
    confirmBtn?.addEventListener('click', async function() {
        // 모달을 닫지 않음 - 계좌번호 계속 표시
        // modal.style.display = 'none';

        if (window.currentOrderData) {
            console.log('주문 데이터:', window.currentOrderData);

            // 성공 메시지 표시
            showNotification('주문이 접수되었습니다! 입금 확인 후 자동으로 작업이 시작됩니다.', 'success');

            if (window.telegramNotifier) {
                try {
                    const success = await window.telegramNotifier.sendOrderNotification(window.currentOrderData);
                    if (success) {
                        console.log('텔레그램 알림 전송 성공');
                    }
                } catch (error) {
                    console.error('텔레그램 알림 전송 오류:', error);
                }
            }

            // 버튼 텍스트 변경
            confirmBtn.innerHTML = '<i class="fas fa-check"></i> 주문 접수 완료';
            confirmBtn.disabled = true;

            // 3초 후 버튼 원상복구
            setTimeout(() => {
                confirmBtn.innerHTML = '입금 완료';
                confirmBtn.disabled = false;
            }, 3000);

            // 폼 리셋은 모달을 닫을 때 실행
            // orderForm.reset();
            // priceDisplay.textContent = '₩0';
        }
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            // 모달 닫을 때 폼 리셋
            if (orderForm) {
                orderForm.reset();
            }
            const priceDisplayElement = document.querySelector('.price-amount');
            if (priceDisplayElement) {
                priceDisplayElement.textContent = '₩0';
            }
        }
    });

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 2rem;
            background: ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#0088cc'};
            color: white;
            border-radius: 0.5rem;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .navbar.scrolled {
            background: rgba(10, 14, 26, 0.98);
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }
        
        .navbar.hidden {
            transform: translateY(-100%);
            transition: transform 0.3s ease;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        @media (max-width: 768px) {
            .nav-menu.active,
            .nav-auth.active {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: var(--card-bg);
                padding: 2rem;
                border-top: 1px solid var(--border-color);
                animation: slideDown 0.3s ease;
            }
            
            .nav-menu.active {
                gap: 1rem;
            }
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.service-card, .pricing-card, .feature-item').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
    
    const fadeInStyle = document.createElement('style');
    fadeInStyle.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(fadeInStyle);

    const statNumbers = document.querySelectorAll('.stat-item h3');
    const animateNumbers = (element) => {
        const target = parseInt(element.textContent.replace(/[^0-9]/g, ''));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateNumber = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current).toLocaleString() + element.textContent.replace(/[0-9,]/g, '');
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = target.toLocaleString() + element.textContent.replace(/[0-9,]/g, '');
            }
        };
        
        updateNumber();
    };
    
    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers(entry.target);
                numberObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(num => numberObserver.observe(num));


    document.addEventListener('mousemove', (e) => {
        const cards = document.querySelectorAll('.service-card, .pricing-card');
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
    
    const glowStyle = document.createElement('style');
    glowStyle.textContent = `
        .service-card::before,
        .pricing-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(
                600px circle at var(--mouse-x) var(--mouse-y),
                rgba(0, 136, 204, 0.06),
                transparent 40%
            );
            border-radius: inherit;
            opacity: 0;
            transition: opacity 0.3s;
            pointer-events: none;
        }
        
        .service-card:hover::before,
        .pricing-card:hover::before {
            opacity: 1;
        }
    `;
    document.head.appendChild(glowStyle);
});

console.log('TeleBoost Pro - 텔레그램 SMM 패널 로드 완료');