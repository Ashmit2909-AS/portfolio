document.addEventListener('DOMContentLoaded', () => {
    // =========================
    // CHATBOT ELEMENTS
    // =========================

    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const closeChatbot = document.getElementById('closeChatbot');
    const chatbotInput = document.getElementById('chatbotInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatbotBody = document.getElementById('chatbotBody');
    let cvText = '';
    let cvLoadPromise = null;
    let cvLoadFailed = false;

    async function loadCvText() {
        if (!window.pdfjsLib) {
            console.warn('pdf.js not loaded, CV parsing disabled.');
            cvLoadFailed = true;
            return;
        }

        pdfjsLib.GlobalWorkerOptions.workerSrc =
            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.12.313/pdf.worker.min.js';

        try {
            const loadingTask = pdfjsLib.getDocument('PDF-parser/CV_ASHMIT MAHARBAN.pdf');
            const pdf = await loadingTask.promise;
            const pages = [];

            for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
                const page = await pdf.getPage(pageNumber);
                const content = await page.getTextContent();
                const pageText = content.items.map((item) => item.str).join(' ');
                pages.push(pageText);
            }

            cvText = pages.join('\n\n');
        } catch (error) {
            console.error('Failed to load CV PDF:', error);
            cvText = '';
            cvLoadFailed = true;
        }
    }

    function getQueryTerms(query) {
        const stopWords = new Set([
            'the', 'and', 'for', 'with', 'about', 'from', 'that', 'this', 'your', 'please', 'a', 'an', 'is', 'are', 'to', 'of', 'in', 'on', 'at', 'as', 'by', 'it', 'he', 'she', 'his', 'her', 'who', 'what', 'where', 'when', 'why', 'how', 'which', 'does', 'do', 'did', 'have', 'has', 'had', 'can', 'could', 'will', 'would', 'should',
            'de', 'het', 'een', 'en', 'van', 'ik', 'je', 'jij', 'jou', 'mij', 'mijn', 'jouw', 'zijn', 'haar', 'ons', 'ons', 'hun', 'wat', 'waar', 'wanneer', 'waarom', 'hoe', 'welke'
        ]);
        const synonymMap = {
            living: 'live',
            lives: 'live',
            lived: 'live',
            location: 'location',
            based: 'based',
            address: 'address',
            city: 'city',
            country: 'country',
            werk: 'work',
            studie: 'education',
            opleiding: 'education',
            ervaring: 'experience',
            project: 'project',
            projecten: 'project',
            beveiliging: 'security',
            recruitment: 'recruitment',
            contact: 'contact',
            'e-mail': 'email',
            email: 'email',
            cv: 'cv',
            doel: 'goal',
            toekomst: 'future',
            toekomstplannen: 'future'
        };
        const rawWords = query
            .toLowerCase()
            .replace(/[?.!]/g, '')
            .match(/\b\w+\b/g) || [];
        return rawWords
            .filter((word) => word.length > 2 && !stopWords.has(word))
            .map((word) => synonymMap[word] || word);
    }

    function findCvSnippet(query) {
        if (!cvText) {
            return null;
        }

        const words = getQueryTerms(query);
        if (!words.length) {
            return null;
        }

        const paragraphs = cvText
            .split(/\n{2,}/)
            .map((paragraph) => paragraph.trim())
            .filter(Boolean);

        let best = {score: 0, paragraph: ''};

        for (const paragraph of paragraphs) {
            const lowerParagraph = paragraph.toLowerCase();
            const score = words.reduce((sum, word) => sum + (lowerParagraph.includes(word) ? 1 : 0), 0);
            if (score > best.score) {
                best = {score, paragraph};
            }
        }

        if (best.score < Math.max(1, words.length / 3)) {
            return null;
        }

        const sentences = best.paragraph.split(/(?<=[.?!])\s+/).filter(Boolean);
        const matchedSentences = sentences.filter((sentence) => {
            const lowerSentence = sentence.toLowerCase();
            return words.some((word) => lowerSentence.includes(word));
        });

        if (matchedSentences.length) {
            return matchedSentences.slice(0, 2).join(' ').trim();
        }

        return sentences.slice(0, 2).join(' ').trim();
    }

    if (
        !chatbotToggle ||
        !chatbotContainer ||
        !closeChatbot ||
        !chatbotInput ||
        !sendMessage ||
        !chatbotBody
    ) {
        return;
    }

    // =========================
    // OPEN CHATBOT
    // =========================

    cvLoadPromise = loadCvText();

    chatbotToggle.addEventListener('click', () => {
        chatbotContainer.classList.add('active');
        chatbotContainer.setAttribute('aria-hidden', 'false');
        chatbotInput.focus();
    });

    // =========================
    // CLOSE CHATBOT
    // =========================

    closeChatbot.addEventListener('click', () => {
        chatbotContainer.classList.remove('active');
        chatbotContainer.setAttribute('aria-hidden', 'true');
    });

    // =========================
    // SEND MESSAGE
    // =========================

    async function sendUserMessage() {
        const message = chatbotInput.value.trim();
        if (!message) return;

        const userMessage = document.createElement('div');
        userMessage.classList.add('user-message');
        userMessage.innerText = message;
        chatbotBody.appendChild(userMessage);

        chatbotInput.value = '';
        chatbotBody.scrollTop = chatbotBody.scrollHeight;

        if (cvLoadPromise) {
            await cvLoadPromise;
        }

        setTimeout(() => {
            generateBotResponse(message);
        }, 500);
    }

    // =========================
    // BOT RESPONSE
    // =========================

    function generateBotResponse(message) {
        const cleanedMessage = message.trim().replace(/[?.!]/g, '').toLowerCase();

        const knowledgeBase = [
            {
                keywords: ['soc', 'security', 'security operations', 'soc engineer', 'soc-engineer', 'monitoring', 'incident management', 'beveiliging', 'incident'],
                response:
                    'Ashmit werkt als SOC Engineer met focus op monitoring, incident management, troubleshooting en procesverbetering.'
            },
            {
                keywords: ['recruitment', 'hiring', 'candidates', 'onboarding', 'recruit', 'werving', 'selectie', 'recruitment'],
                response:
                    'Ashmit heeft ervaring met recruitment, kandidaten screening, onboarding en HR-ondersteuning.'
            },
            {
                keywords: ['operations', 'operations support', 'logistics', 'business support', 'project coordination', 'ondersteuning', 'logistiek'],
                response:
                    'Ashmit heeft ervaring in IT-support, projectcoördinatie, logistieke ondersteuning en zakelijke administratie.'
            },
            {
                keywords: ['education', 'study', 'school', 'university', 'unasat', 'student', 'studie', 'opleiding'],
                response: 'Ashmit studeert momenteel Software Engineering aan de Universiteit van Suriname (UNASAT).'
            },
            {
                keywords: ['skills', 'ability', 'strengths', 'expertise', 'competencies', 'vaardigheden', 'sterktes'],
                response:
                    'Ashmit’s belangrijkste vaardigheden zijn SOC operations, IT-support, recruitment, troubleshooting, procesoptimalisatie, communicatie en projectcoördinatie.'
            },
            {
                keywords: ['contact', 'email', 'reach', 'connect', 'message', 'mail', 'contacteer'],
                response: 'Je kunt Ashmit bereiken via e-mail: A_maharban@outlook.com.'
            },
            {
                keywords: ['age', 'years old', 'old are you', 'age of', 'leeftijd'],
                response:
                    'Ashmit is een jonge professional die studeert in Software Engineering en werkt in SOC Engineering.'
            },
            {
                keywords: ['about', 'who is', 'tell me', 'little bit', 'introduction', 'profile', 'wie', 'wat', 'vertel'],
                response:
                    'Ashmit is een multidisciplinaire professional met ervaring in SOC Engineering, IT operations, recruitment, business support en software engineering studies.'
            },
            {
                keywords: ['experience', 'worked', 'working', 'career', 'background', 'ervaring', 'carrière'],
                response:
                    'Ashmit heeft gewerkt in SOC Engineering, IT-support, recruitment, procesverbetering en operationscoördinatie.'
            },
            {
                keywords: ['project', 'projects', 'portfolio', 'work examples', 'projecten'],
                response:
                    'Je vindt Ashmit’s projecten in de portfoliosectie, met voorbeelden van IT-support, procesoptimalisatie en technische werkervaring.'
            },
            {
                keywords: ['languages', 'dutch', 'english', 'language', 'talen', 'nederlands', 'engels'],
                response: 'Ashmit spreekt Nederlands en Engels en communiceert graag helder in zowel technische als zakelijke context.'
            },
            {
                keywords: ['goals', 'future', 'aspiration', 'ambition', 'doelen', 'toekomst', 'ambitie'],
                response: 'Ashmit wil blijven groeien in SOC Engineering en tegelijkertijd sterke IT operations- en business supportvaardigheden ontwikkelen.'
            },
            {
                keywords: ['strength', 'strengths', 'weakness', 'weaknesses', 'sterkte', 'zwakte'],
                response:
                    'Ashmit blinkt uit in samenwerking tussen IT en business, met sterke vaardigheden in communicatie, coördinatie, troubleshooting en procesverbetering.'
            }
        ];

        let response = knowledgeBase.find((item) =>
            item.keywords.some((keyword) => cleanedMessage.includes(keyword))
        )?.response;

        if (!response) {
            const cvSnippet = findCvSnippet(cleanedMessage);
            if (cvSnippet) {
                response = `Uit Ashmit's CV: ${cvSnippet}`;
            } else {
                const generalFallback =
                    'Ashmit is een multidisciplinaire professional met ervaring in SOC Engineering, IT operations, recruitment, business support en software engineering studies. Stel gerust een vraag over zijn ervaring, opleidingen, projecten of contactmogelijkheden.';

                const questionWords = ['who', 'what', 'where', 'when', 'why', 'how', 'which', 'wie', 'wat', 'waar', 'wanneer', 'waarom', 'hoe', 'welke', 'is', 'kan', 'kun', 'zal'];
                const containsQuestionWord = questionWords.some((word) => cleanedMessage.startsWith(word) || cleanedMessage.includes(` ${word} `));

                response = containsQuestionWord
                    ? generalFallback
                    : 'Ik kan veel vragen beantwoorden over Ashmit’s achtergrond, vaardigheden en projecten. Probeer het nog eens met een andere vraag.';
            }
        }

        const botMessage = document.createElement('div');
        botMessage.classList.add('bot-message');
        botMessage.textContent = '';
        chatbotBody.appendChild(botMessage);

        let index = 0;

        function typingEffect() {
            if (index < response.length) {
                botMessage.textContent += response.charAt(index);
                index += 1;
                chatbotBody.scrollTop = chatbotBody.scrollHeight;
                setTimeout(typingEffect, 15);
            }
        }

        typingEffect();
    }

    sendMessage.addEventListener('click', sendUserMessage);

    chatbotInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            sendUserMessage();
        }
    });
});