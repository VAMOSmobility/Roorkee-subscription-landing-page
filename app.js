// VAMOS Mobility Enhanced Landing Page JavaScript

// Global variables
let maps = { from: null, to: null };
let markers = { from: null, to: null };
let fuse = null;
let currentLanguage = 'en';
let debounceTimers = {};

// Application data
const appData = {
  "roorkee_coordinates": {
    "lat": 29.8543,
    "lng": 77.8880
  },
  "popular_locations": [
    {
      "name_en": "IIT Roorkee Main Gate",
      "name_hi": "आईआईटी रुड़की मुख्य गेट",
      "lat": 29.8668,
      "lng": 77.8997,
      "type": "educational"
    },
    {
      "name_en": "Roorkee Railway Station",
      "name_hi": "रुड़की रेलवे स्टेशन",
      "lat": 29.8543,
      "lng": 77.8880,
      "type": "transport"
    },
    {
      "name_en": "Roorkee Bus Stand",
      "name_hi": "रुड़की बस स्टैंड",
      "lat": 29.8512,
      "lng": 77.8866,
      "type": "transport"
    },
    {
      "name_en": "Civil Lines Roorkee",
      "name_hi": "सिविल लाइन्स रुड़की",
      "lat": 29.8588,
      "lng": 77.8878,
      "type": "residential"
    },
    {
      "name_en": "Malviya Chowk",
      "name_hi": "मालवीय चौक",
      "lat": 29.8534,
      "lng": 77.8899,
      "type": "commercial"
    },
    {
      "name_en": "Gandhi Nagar",
      "name_hi": "गांधी नगर",
      "lat": 29.8567,
      "lng": 77.8934,
      "type": "residential"
    },
    {
      "name_en": "Haridwar",
      "name_hi": "हरिद्वार",
      "lat": 29.9457,
      "lng": 78.1642,
      "type": "city"
    }
  ],
  "common_times": [
    "06:00", "06:30", "07:00", "07:30", "08:00", "08:30",
    "09:00", "09:30", "10:00", "17:00", "17:30", "18:00",
    "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"
  ],
  "translations": {
    "en": {
      "tagline": "Daily Commute Made Simple",
      "hero_title": "Transform Your Daily Commute in Roorkee",
      "hero_subtitle": "Join the waitlist for affordable, reliable shared rides. Be the first to experience seamless transportation to offices, school, tuitions and colleges.",
      "form_title": "Join the Waitlist",
      "form_subtitle": "Be the first to know when we launch in your area",
      "form_from": "Pickup Location",
      "form_to": "Drop Location",
      "form_pickup_time": "Pickup Time",
      "form_return_time": "Return Time",
      "form_people": "Number of People",
      "form_price": "Expected Daily Price",
      "form_phone": "Phone Number",
      "phone_placeholder": "e.g., +91 98765 43210",
      "submit_button": "Join the Waitlist",
      "form_note": "Free to join • No commitment • Early access guaranteed",
      "benefit_1": "Affordable shared rides",
      "benefit_2": "Reliable daily transport",
      "benefit_3": "Safe & secure travel",
      "benefit_4": "Eco-friendly commuting",
      "waitlist_perks_title": "Early Access Benefits:",
      "perk_1": "Early access to the app",
      "perk_2": "Special launch discounts",
      "perk_3": "Priority route planning",
      "perk_4": "Beta testing opportunities",
      "nav_how_it_works": "How It Works",
      "nav_features": "Features",
      "nav_contact": "Contact",
      "from_placeholder": "Type where you want to get picked up",
      "to_placeholder": "Type where you want to be dropped",
      "select_pickup": "Select pickup location on map",
      "select_destination": "Select destination on map",
      "use_current_location": "📍 Use Current Location",
      "common_times": "Common Times",
      "select_people": "Select",
      "people_1": "1 Person",
      "people_2": "2 People",
      "people_3": "3 People",
      "people_4": "4 People",
      "people_5": "5 People",
      "people_6": "6 People",
      "select_price": "Select range",
      "price_placeholder": "Enter expected daily price",
      "price_1": "₹50-₹100 per day",
      "price_2": "₹100-₹200 per day",
      "price_3": "₹200-₹300 per day",
      "price_4": "₹300-₹500 per day",
      "send_otp": "Send OTP",
      "verify_otp": "Verify OTP",
      "phone_verified": "Phone verified ✅",
      "otp_sent": "OTP sent. Please check your phone.",
      "otp_invalid": "Invalid OTP. Please try again.",
      "otp_verified": "Phone number verified successfully.",
      "otp_resend_in": "You can resend OTP in {seconds}s",
      "otp_resend": "Resend OTP",
      "phone_verify_required": "Please verify your phone number",
      "features_title": "Why Join VAMOS Waitlist?",
      "feature_1_title": "Affordable Shared Rides",
      "feature_1_desc": "Save up to 70% on daily transport costs by sharing rides with fellow commuters traveling the same route.",
      "feature_2_title": "Reliable Daily Transport",
      "feature_2_desc": "Punctual pickups and drops ensure you never miss classes, work, or important appointments.",
      "feature_3_title": "Smart Route Mapping",
      "feature_3_desc": "Interactive maps with pin-point accuracy for pickup and drop locations across Roorkee.",
      "feature_4_title": "Safe & Secure Travel",
      "feature_4_desc": "Verified drivers, real-time tracking, and 24/7 support for your peace of mind.",
      "feature_5_title": "Eco-friendly Commuting",
      "feature_5_desc": "Reduce your carbon footprint by sharing rides and contributing to a cleaner Roorkee.",
      "feature_6_title": "Flexible Precise Timing",
      "feature_6_desc": "Select exact pickup and return times to the minute for perfect schedule alignment.",
      "how_title": "How VAMOS Will Work",
      "step_1_title": "Join the Waitlist",
      "step_1_desc": "Sign up with your commute details using our interactive form. Get priority access when we launch!",
      "step_2_title": "Get Early Access",
      "step_2_desc": "Be among the first to download the app and start booking rides with special launch benefits.",
      "step_3_title": "Smart Commuting",
      "step_3_desc": "Enjoy comfortable, affordable rides with precise timing and route optimization every day.",
      "timeline_title": "Launch Timeline",
      "timeline_1_title": "Waitlist Open",
      "timeline_1_desc": "Join now to secure your spot",
      "timeline_1_date": "Now - February 2025",
      "timeline_2_title": "Beta Testing",
      "timeline_2_desc": "Selected waitlist members get early access",
      "timeline_2_date": "March 2025",
      "timeline_3_title": "Full Launch",
      "timeline_3_desc": "VAMOS goes live for everyone",
      "timeline_3_date": "April 2025",
      "testimonials_title": "What Roorkee Commuters Are Saying",
      "testimonial_1": "\"Can't wait for VAMOS to launch! The interactive map feature looks amazing for finding exact pickup spots.\"",
      "testimonial_1_role": "IIT Roorkee Student",
      "testimonial_2": "\"Finally, a solution that understands the need for precise timing. Already joined the waitlist!\"",
      "testimonial_2_role": "Software Engineer",
      "testimonial_3": "\"Love that they're supporting both Hindi and English. Very thoughtful for our diverse community.\"",
      "testimonial_3_role": "College Student",
      "stat_1_number": "2000+",
      "stat_1_text": "Waitlist Members",
      "stat_2_number": "25+",
      "stat_2_text": "Routes Planned",
      "stat_3_number": "95%",
      "stat_3_text": "Interest Rate",
      "footer_desc": "Connecting Roorkee commuters with affordable, reliable, and smart shared transportation. Join the revolution!",
      "contact_title": "Contact Us",
      "contact_email": "📧 admin@vamosiitr.com",
      "contact_phone": "📱 +91-9997847667",
      "contact_address": "📍 Roorkee, Uttarakhand",
      "quick_links": "Quick Links",
      "link_about": "About Us",
      "link_safety": "Safety",
      "link_terms": "Terms",
      "link_privacy": "Privacy",
      "copyright": "© 2025 VAMOS Mobility. All rights reserved. Made with ❤️ for Roorkee commuters."
    },
    "hi": {
      "tagline": "दैनिक यात्रा को बनाएं आसान",
      "hero_title": "रुड़की में अपनी दैनिक यात्रा को बदलें",
      "hero_subtitle": "किफायती, भरोसेमंद साझा सवारी के लिए वेटलिस्ट में शामिल हों। ऑफिसों, स्कूल, ट्यूशन और कॉलेजों के लिए निर्बाध परिवहन का पहला अनुभव करें।",
      "form_title": "वेटलिस्ट में शामिल हों",
      "form_subtitle": "जब हम आपके क्षेत्र में लॉन्च करें तो पहले जानें",
      "form_from": "पिकअप स्थान",
      "form_to": "ड्रॉप स्थान",
      "form_pickup_time": "पिकअप समय",
      "form_return_time": "वापसी का समय",
      "form_people": "लोगों की संख्या",
      "form_price": "अपेक्षित दैनिक मूल्य",
      "form_phone": "फ़ोन नंबर",
      "phone_placeholder": "उदा., +91 98765 43210",
      "submit_button": "वेटलिस्ट में शामिल हों",
      "form_note": "शामिल होना मुफ़्त • कोई प्रतिबद्धता नहीं • प्रारंभिक पहुंच की गारंटी",
      "benefit_1": "किफायती साझा सवारी",
      "benefit_2": "भरोसेमंद दैनिक परिवहन",
      "benefit_3": "सुरक्षित और संरक्षित यात्रा",
      "benefit_4": "पर्यावरण अनुकूल आवागमन",
      "waitlist_perks_title": "प्रारंभिक पहुंच के फायदे:",
      "perk_1": "ऐप में प्रारंभिक पहुंच",
      "perk_2": "विशेष लॉन्च छूट",
      "perk_3": "प्राथमिकता रूट योजना",
      "perk_4": "बीटा टेस्टिंग के अवसर",
      "nav_how_it_works": "यह कैसे काम करता है",
      "nav_features": "विशेषताएं",
      "nav_contact": "संपर्क करें",
      "from_placeholder": "जहाँ से आपको पिकअप होना है, वह लिखें",
      "to_placeholder": "जहाँ आपको ड्रॉप होना है, वह लिखें",
      "select_pickup": "मैप पर पिकअप स्थान चुनें",
      "select_destination": "मैप पर गंतव्य चुनें",
      "use_current_location": "📍 वर्तमान स्थान का उपयोग करें",
      "common_times": "सामान्य समय",
      "select_people": "चुनें",
      "people_1": "1 व्यक्ति",
      "people_2": "2 लोग",
      "people_3": "3 लोग",
      "people_4": "4 लोग",
      "people_5": "5 लोग",
      "people_6": "6 लोग",
      "select_price": "रेंज चुनें",
      "price_placeholder": "अपेक्षित दैनिक मूल्य दर्ज करें",
      "price_1": "₹50-₹100 प्रति दिन",
      "price_2": "₹100-₹200 प्रति दिन",
      "price_3": "₹200-₹300 प्रति दिन",
      "price_4": "₹300-₹500 प्रति दिन",
      "send_otp": "ओटीपी भेजें",
      "verify_otp": "ओटीपी सत्यापित करें",
      "phone_verified": "फोन सत्यापित ✅",
      "otp_sent": "ओटीपी भेज दिया गया है। कृपया अपने फोन की जांच करें।",
      "otp_invalid": "अमान्य ओटीपी। कृपया पुनः प्रयास करें।",
      "otp_verified": "फोन नंबर सफलतापूर्वक सत्यापित हुआ।",
      "otp_resend_in": "आप {seconds} सेकंड में ओटीपी फिर से भेज सकते हैं",
      "otp_resend": "ओटीपी पुनः भेजें",
      "phone_verify_required": "कृपया अपना फोन नंबर सत्यापित करें",
      "features_title": "VAMOS वेटलिस्ट में क्यों शामिल हों?",
      "feature_1_title": "किफायती साझा सवारी",
      "feature_1_desc": "एक ही मार्ग पर यात्रा करने वाले साथी यात्रियों के साथ सवारी साझा करके दैनिक परिवहन लागत में 70% तक बचाएं।",
      "feature_2_title": "भरोसेमंद दैनिक परिवहन",
      "feature_2_desc": "समय पर पिकअप और ड्रॉप सुनिश्चित करते हैं कि आप कभी भी कक्षाओं, काम या महत्वपूर्ण नियुक्तियों को न छोड़ें।",
      "feature_3_title": "स्मार्ट रूट मैपिंग",
      "feature_3_desc": "रुड़की भर में पिकअप और ड्रॉप स्थानों के लिए पिन-पॉइंट सटीकता के साथ इंटरैक्टिव मैप।",
      "feature_4_title": "सुरक्षित और संरक्षित यात्रा",
      "feature_4_desc": "सत्यापित ड्राइवर, रीयल-टाइम ट्रैकिंग, और आपकी शांति के लिए 24/7 सहायता।",
      "feature_5_title": "पर्यावरण अनुकूल आवागमन",
      "feature_5_desc": "सवारी साझा करके और एक स्वच्छ रुड़की में योगदान करके अपना कार्बन फुटप्रिंट कम करें।",
      "feature_6_title": "लचीला सटीक समय",
      "feature_6_desc": "पूर्ण शेड्यूल संरेखण के लिए मिनट तक सटीक पिकअप और वापसी समय चुनें।",
      "how_title": "VAMOS कैसे काम करेगा",
      "step_1_title": "वेटलिस्ट में शामिल हों",
      "step_1_desc": "हमारे इंटरैक्टिव फॉर्म का उपयोग करके अपने कम्यूट विवरण के साथ साइन अप करें। जब हम लॉन्च करें तो प्राथमिकता पहुंच प्राप्त करें!",
      "step_2_title": "प्रारंभिक पहुंच प्राप्त करें",
      "step_2_desc": "ऐप डाउनलोड करने और विशेष लॉन्च लाभों के साथ सवारी बुक करना शुरू करने वाले पहले लोगों में से एक बनें।",
      "step_3_title": "स्मार्ट कम्यूटिंग",
      "step_3_desc": "हर दिन सटीक समय और रूट अनुकूलन के साथ आरामदायक, किफायती सवारी का आनंद लें।",
      "timeline_title": "लॉन्च टाइमलाइन",
      "timeline_1_title": "वेटलिस्ट खुला",
      "timeline_1_desc": "अपनी जगह सुरक्षित करने के लिए अभी शामिल हों",
      "timeline_1_date": "अभी - फरवरी 2025",
      "timeline_2_title": "बीटा टेस्टिंग",
      "timeline_2_desc": "चयनित वेटलिस्ट सदस्यों को प्रारंभिक पहुंच मिलती है",
      "timeline_2_date": "मार्च 2025",
      "timeline_3_title": "पूर्ण लॉन्च",
      "timeline_3_desc": "VAMOS सभी के लिए लाइव हो जाता है",
      "timeline_3_date": "अप्रैल 2025",
      "testimonials_title": "रुड़की के यात्री क्या कह रहे हैं",
      "testimonial_1": "\"VAMOS के लॉन्च का इंतजार नहीं कर सकते! सटीक पिकअप स्पॉट खोजने के लिए इंटरैक्टिव मैप फीचर अद्भुत लग रहा है।\"",
      "testimonial_1_role": "आईआईटी रुड़की छात्र",
      "testimonial_2": "\"अंततः, एक समाधान जो सटीक समय की आवश्यकता को समझता है। पहले से ही वेटलिस्ट में शामिल हो गए!\"",
      "testimonial_2_role": "सॉफ्टवेयर इंजीनियर",
      "testimonial_3": "\"प्यार है कि वे हिंदी और अंग्रेजी दोनों का समर्थन कर रहे हैं। हमारे विविध समुदाय के लिए बहुत विचारशील।\"",
      "testimonial_3_role": "कॉलेज छात्र",
      "stat_1_number": "2000+",
      "stat_1_text": "वेटलिस्ट सदस्य",
      "stat_2_number": "25+",
      "stat_2_text": "योजनाबद्ध मार्ग",
      "stat_3_number": "95%",
      "stat_3_text": "रुचि दर",
      "footer_desc": "रुड़की के यात्रियों को किफायती, भरोसेमंद और स्मार्ट साझा परिवहन से जोड़ना। क्रांति में शामिल हों!",
      "contact_title": "संपर्क करें",
      "contact_email": "📧 admin@vamosiitr.com",
      "contact_phone": "📱 +91-9997847667",
      "contact_address": "📍 रुड़की, उत्तराखंड",
      "quick_links": "त्वरित लिंक",
      "link_about": "हमारे बारे में",
      "link_safety": "सुरक्षा",
      "link_terms": "शर्तें",
      "link_privacy": "गोपनीयता",
      "copyright": "© 2025 VAMOS Mobility. सर्वाधिकार सुरक्षित। रुड़की के यात्रियों के लिए ❤️ के साथ बनाया गया।"
    }
  }
};

// Wait for DOM and external libraries to load
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for external libraries to load
    setTimeout(initializeApp, 100);
});

function initializeApp() {
    try {
        console.log('Initializing VAMOS Enhanced App...');
        
        // Load saved language preference
        const savedLanguage = localStorage.getItem('vamos-language') || 'en';
        currentLanguage = savedLanguage;
        
        // Initialize all modules
        initializeLanguageToggle();
        initializeFuzzySearch();
        initializeMaps();
        initializeTimePresets();
        initializeFormValidation();
        initializeSmoothScrolling();
        initializeMobileOptimizations();
        
        // Apply saved language
        switchLanguage(currentLanguage, false);
        
        console.log('VAMOS Mobility Enhanced App Initialized Successfully! 🚗✨');
    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

// Language Toggle System
function initializeLanguageToggle() {
    const languageToggle = document.getElementById('languageToggle');
    if (!languageToggle) {
        console.warn('Language toggle button not found');
        return;
    }
    
    languageToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const newLanguage = currentLanguage === 'en' ? 'hi' : 'en';
        switchLanguage(newLanguage, true);
        console.log('Language switched to:', newLanguage);
    });
    
    updateLanguageToggleButton();
}

function switchLanguage(language, save = true) {
    if (!appData.translations[language]) {
        console.error('Language not supported:', language);
        return;
    }
    
    currentLanguage = language;
    const translations = appData.translations[language];
    
    // Update all translatable elements
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[key]) {
            element.textContent = translations[key];
        }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (translations[key]) {
            element.placeholder = translations[key];
        }
    });
    
    // Update select options
    updateSelectOptions();
    
    // Update HTML language attribute
    const htmlRoot = document.getElementById('html-root') || document.documentElement;
    htmlRoot.setAttribute('lang', language);
    
    // Update language toggle button
    updateLanguageToggleButton();
    
    // Save preference
    if (save) {
        localStorage.setItem('vamos-language', language);
    }
    
    // Re-initialize fuzzy search with new language
    if (window.Fuse) {
        initializeFuzzySearch();
    }
}

function updateLanguageToggleButton() {
    const toggle = document.getElementById('languageToggle');
    const toggleText = toggle?.querySelector('.language-toggle__text');
    
    if (toggleText) {
        toggleText.textContent = currentLanguage === 'en' ? 'हिन्दी' : 'English';
    }
}

function updateSelectOptions() {
    const translations = appData.translations[currentLanguage];
    
    // Update people select options
    const peopleSelect = document.getElementById('people');
    if (peopleSelect) {
        const options = peopleSelect.querySelectorAll('option');
        options.forEach(option => {
            const key = option.getAttribute('data-translate');
            if (key && translations[key]) {
                option.textContent = translations[key];
            }
        });
    }
    
    // Update price range select options
    const priceSelect = document.getElementById('priceRange');
    if (priceSelect) {
        const options = priceSelect.querySelectorAll('option');
        options.forEach(option => {
            const key = option.getAttribute('data-translate');
            if (key && translations[key]) {
                option.textContent = translations[key];
            }
        });
    }
}

// Fuzzy Search Implementation
function initializeFuzzySearch() {
    // Check if Fuse.js is available
    if (typeof window.Fuse === 'undefined') {
        console.warn('Fuse.js not loaded, using basic search fallback');
        initializeBasicSearch();
        return;
    }
    
    // Prepare search data with current language
    const searchData = appData.popular_locations.map(location => ({
        name: currentLanguage === 'hi' ? location.name_hi : location.name_en,
        name_en: location.name_en,
        name_hi: location.name_hi,
        lat: location.lat,
        lng: location.lng,
        type: location.type
    }));
    
    // Initialize Fuse.js
    try {
        fuse = new Fuse(searchData, {
            keys: ['name', 'name_en', 'name_hi'],
            threshold: 0.4,
            distance: 100,
            includeScore: true
        });
        
        // Setup search for both from and to locations
        setupLocationSearch('fromLocation', 'fromSuggestions');
        setupLocationSearch('toLocation', 'toSuggestions');
        
        console.log('Fuzzy search initialized with Fuse.js');
    } catch (error) {
        console.error('Error initializing Fuse.js:', error);
        initializeBasicSearch();
    }
}

function initializeBasicSearch() {
    // Fallback basic search implementation
    setupBasicLocationSearch('fromLocation', 'fromSuggestions');
    setupBasicLocationSearch('toLocation', 'toSuggestions');
    console.log('Basic search initialized as fallback');
}

function setupLocationSearch(inputId, suggestionsId) {
    const input = document.getElementById(inputId);
    const suggestionsEl = document.getElementById(suggestionsId);
    
    if (!input || !suggestionsEl) {
        console.warn(`Elements not found: ${inputId}, ${suggestionsId}`);
        return;
    }
    
    let selectedIndex = -1;
    
    input.addEventListener('input', function(e) {
        const query = e.target.value.trim();
        
        // Clear existing debounce timer
        if (debounceTimers[inputId]) {
            clearTimeout(debounceTimers[inputId]);
        }
        
        debounceTimers[inputId] = setTimeout(() => {
            if (query.length >= 2) {
                showSuggestions(query, suggestionsEl, input);
            } else {
                hideSuggestions(suggestionsEl);
            }
        }, 300);
    });
    
    input.addEventListener('keydown', function(e) {
        const suggestions = suggestionsEl.querySelectorAll('.suggestion-item');
        
        switch(e.key) {
            case 'ArrowDown':
                e.preventDefault();
                selectedIndex = Math.min(selectedIndex + 1, suggestions.length - 1);
                updateSelectedSuggestion(suggestions, selectedIndex);
                break;
            case 'ArrowUp':
                e.preventDefault();
                selectedIndex = Math.max(selectedIndex - 1, -1);
                updateSelectedSuggestion(suggestions, selectedIndex);
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && suggestions[selectedIndex]) {
                    selectSuggestion(suggestions[selectedIndex], input, suggestionsEl);
                }
                break;
            case 'Escape':
                hideSuggestions(suggestionsEl);
                selectedIndex = -1;
                break;
        }
    });
    
    // Hide suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (!input.contains(e.target) && !suggestionsEl.contains(e.target)) {
            hideSuggestions(suggestionsEl);
            selectedIndex = -1;
        }
    });
}

function setupBasicLocationSearch(inputId, suggestionsId) {
    const input = document.getElementById(inputId);
    const suggestionsEl = document.getElementById(suggestionsId);
    
    if (!input || !suggestionsEl) return;
    
    input.addEventListener('input', function(e) {
        const query = e.target.value.trim().toLowerCase();
        
        if (debounceTimers[inputId]) {
            clearTimeout(debounceTimers[inputId]);
        }
        
        debounceTimers[inputId] = setTimeout(() => {
            if (query.length >= 2) {
                const filtered = appData.popular_locations.filter(location => {
                    const name_en = location.name_en.toLowerCase();
                    const name_hi = location.name_hi;
                    return name_en.includes(query) || name_hi.includes(query);
                });
                
                showBasicSuggestions(filtered, suggestionsEl, input);
            } else {
                hideSuggestions(suggestionsEl);
            }
        }, 300);
    });
}

function showSuggestions(query, suggestionsEl, input) {
    if (!fuse) return;
    
    const results = fuse.search(query);
    
    if (results.length === 0) {
        hideSuggestions(suggestionsEl);
        return;
    }
    
    const html = results.slice(0, 6).map((result, index) => {
        const location = result.item;
        return `
            <div class="suggestion-item" data-lat="${location.lat}" data-lng="${location.lng}" data-name="${location.name}">
                <span class="suggestion-name">${location.name}</span>
                <span class="suggestion-type">${location.type}</span>
            </div>
        `;
    }).join('');
    
    suggestionsEl.innerHTML = html;
    suggestionsEl.classList.remove('hidden');
    
    // Add click listeners to suggestions
    suggestionsEl.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            selectSuggestion(item, input, suggestionsEl);
        });
    });
}

function showBasicSuggestions(locations, suggestionsEl, input) {
    if (locations.length === 0) {
        hideSuggestions(suggestionsEl);
        return;
    }
    
    const html = locations.slice(0, 6).map(location => {
        const name = currentLanguage === 'hi' ? location.name_hi : location.name_en;
        return `
            <div class="suggestion-item" data-lat="${location.lat}" data-lng="${location.lng}" data-name="${name}">
                <span class="suggestion-name">${name}</span>
                <span class="suggestion-type">${location.type}</span>
            </div>
        `;
    }).join('');
    
    suggestionsEl.innerHTML = html;
    suggestionsEl.classList.remove('hidden');
    
    // Add click listeners to suggestions
    suggestionsEl.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            selectSuggestion(item, input, suggestionsEl);
        });
    });
}

function hideSuggestions(suggestionsEl) {
    if (suggestionsEl) {
        suggestionsEl.classList.add('hidden');
    }
}

function updateSelectedSuggestion(suggestions, index) {
    suggestions.forEach((suggestion, i) => {
        if (i === index) {
            suggestion.classList.add('highlighted');
        } else {
            suggestion.classList.remove('highlighted');
        }
    });
}

function selectSuggestion(suggestionEl, input, suggestionsEl) {
    const name = suggestionEl.dataset.name;
    const lat = parseFloat(suggestionEl.dataset.lat);
    const lng = parseFloat(suggestionEl.dataset.lng);
    
    input.value = name;
    input.dataset.lat = lat;
    input.dataset.lng = lng;
    
    // Update corresponding map
    const mapType = input.id === 'fromLocation' ? 'from' : 'to';
    if (maps[mapType]) {
        updateMapMarker(mapType, lat, lng, name);
    }
    
    hideSuggestions(suggestionsEl);
    clearFieldError(input);
}

// Interactive Maps Implementation
function initializeMaps() {
    // Check if Leaflet is available
    if (typeof window.L === 'undefined') {
        console.warn('Leaflet not loaded, map functionality disabled');
        // Hide map buttons if Leaflet is not available
        document.querySelectorAll('.location-btn').forEach(btn => {
            btn.style.display = 'none';
        });
        return;
    }
    
    // Setup map toggle buttons
    document.querySelectorAll('.location-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const locationType = this.dataset.location;
            toggleMap(locationType);
        });
    });
    
    // Setup map close buttons
    document.querySelectorAll('.map-close').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const mapType = this.dataset.map;
            hideMap(mapType);
        });
    });
    
    // Setup current location buttons
    document.querySelectorAll('.current-location').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const mapType = this.dataset.map;
            getCurrentLocation(mapType);
        });
    });
    
    console.log('Maps initialized');
}

function toggleMap(locationType) {
    const mapContainer = document.getElementById(`${locationType}Map`);
    const mapEl = document.getElementById(`${locationType}MapEl`);
    
    if (!mapContainer || !mapEl) {
        console.warn(`Map elements not found for: ${locationType}`);
        return;
    }
    
    // Hide other map first
    const otherType = locationType === 'from' ? 'to' : 'from';
    hideMap(otherType);
    
    if (mapContainer.classList.contains('hidden')) {
        showMap(locationType);
    } else {
        hideMap(locationType);
    }
}

function showMap(mapType) {
    const mapContainer = document.getElementById(`${mapType}Map`);
    const mapEl = document.getElementById(`${mapType}MapEl`);
    
    if (!mapContainer || !mapEl || typeof window.L === 'undefined') return;
    
    mapContainer.classList.remove('hidden');
    
    // Initialize map if not already done
    if (!maps[mapType]) {
        try {
            maps[mapType] = L.map(mapEl, {
                center: [appData.roorkee_coordinates.lat, appData.roorkee_coordinates.lng],
                zoom: 13,
                zoomControl: true
            });
            
            // Add OpenStreetMap tiles
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 19
            }).addTo(maps[mapType]);
            
            // Add click event for pin dropping
            maps[mapType].on('click', function(e) {
                const { lat, lng } = e.latlng;
                dropPin(mapType, lat, lng);
            });
            
            // Add popular location markers
            addPopularLocationMarkers(maps[mapType], mapType);
            
            console.log(`Map initialized for: ${mapType}`);
        } catch (error) {
            console.error(`Error initializing map for ${mapType}:`, error);
            return;
        }
    }
    
    // Refresh map size (important for proper rendering)
    setTimeout(() => {
        if (maps[mapType]) {
            maps[mapType].invalidateSize();
        }
    }, 100);
}

function hideMap(mapType) {
    const mapContainer = document.getElementById(`${mapType}Map`);
    if (mapContainer) {
        mapContainer.classList.add('hidden');
    }
}

function addPopularLocationMarkers(map, mapType) {
    if (!map) return;
    
    appData.popular_locations.forEach(location => {
        const name = currentLanguage === 'hi' ? location.name_hi : location.name_en;
        
        try {
            const marker = L.marker([location.lat, location.lng])
                .addTo(map)
                .bindPopup(`
                    <div style="text-align: center; font-size: 12px;">
                        <strong>${name}</strong><br>
                        <small style="color: #666; text-transform: capitalize;">${location.type}</small><br>
                        <button onclick="selectLocationFromMap('${mapType}', ${location.lat}, ${location.lng}, '${name}')" 
                                style="margin-top: 5px; padding: 3px 8px; background: #FF6B35; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">
                            Select This Location
                        </button>
                    </div>
                `);
                
            // Different marker colors for different types
            const markerIcon = getMarkerIcon(location.type);
            if (markerIcon) {
                marker.setIcon(markerIcon);
            }
        } catch (error) {
            console.error('Error adding marker:', error);
        }
    });
}

function getMarkerIcon(type) {
    if (typeof window.L === 'undefined') return null;
    
    const colors = {
        educational: '#4CAF50',
        transport: '#2196F3',
        residential: '#FF9800',
        commercial: '#9C27B0',
        city: '#F44336'
    };
    
    const color = colors[type] || '#666';
    
    try {
        return L.divIcon({
            html: `<div style="background: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.3);"></div>`,
            iconSize: [16, 16],
            iconAnchor: [8, 8],
            className: 'custom-marker'
        });
    } catch (error) {
        console.error('Error creating marker icon:', error);
        return null;
    }
}

function dropPin(mapType, lat, lng) {
    const nearestLocation = findNearestLocation(lat, lng);
    const locationName = nearestLocation ? 
        (currentLanguage === 'hi' ? nearestLocation.name_hi : nearestLocation.name_en) : 
        `Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
    
    updateMapMarker(mapType, lat, lng, locationName);
    
    // Update input field
    const input = document.getElementById(`${mapType}Location`);
    if (input) {
        input.value = locationName;
        input.dataset.lat = lat;
        input.dataset.lng = lng;
        clearFieldError(input);
    }
}

function updateMapMarker(mapType, lat, lng, name) {
    const map = maps[mapType];
    if (!map || typeof window.L === 'undefined') return;
    
    try {
        // Remove existing marker
        if (markers[mapType]) {
            map.removeLayer(markers[mapType]);
        }
        
        // Add new marker
        markers[mapType] = L.marker([lat, lng])
            .addTo(map)
            .bindPopup(`<strong>${name}</strong>`)
            .openPopup();
        
        // Center map on marker
        map.setView([lat, lng], Math.max(map.getZoom(), 14));
    } catch (error) {
        console.error('Error updating map marker:', error);
    }
}

function findNearestLocation(lat, lng) {
    let nearest = null;
    let minDistance = Infinity;
    
    appData.popular_locations.forEach(location => {
        const distance = calculateDistance(lat, lng, location.lat, location.lng);
        if (distance < minDistance && distance < 2) { // Within 2km
            minDistance = distance;
            nearest = location;
        }
    });
    
    return nearest;
}

function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

function getCurrentLocation(mapType) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                dropPin(mapType, lat, lng);
            },
            function(error) {
                console.error('Geolocation error:', error);
                alert('Could not get your current location. Please select manually on the map.');
            }
        );
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

// Global function for map popup buttons
window.selectLocationFromMap = function(mapType, lat, lng, name) {
    updateMapMarker(mapType, lat, lng, name);
    
    const input = document.getElementById(`${mapType}Location`);
    if (input) {
        input.value = name;
        input.dataset.lat = lat;
        input.dataset.lng = lng;
        clearFieldError(input);
    }
    
    hideMap(mapType);
};

// Time Presets Implementation
function initializeTimePresets() {
    // Setup time preset buttons
    document.querySelectorAll('.time-presets-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const targetId = this.dataset.target;
            toggleTimePresets(targetId);
        });
    });
    
    // Generate time preset buttons
    generateTimePresets('pickupTime');
    generateTimePresets('returnTime');
    
    // Hide presets when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.time-input-container') && !e.target.closest('.time-presets')) {
            hideAllTimePresets();
        }
    });
    
    console.log('Time presets initialized');
}

function generateTimePresets(targetId) {
    const presetsContainer = document.querySelector(`#${targetId}Presets .time-presets__grid`);
    if (!presetsContainer) {
        console.warn(`Time presets container not found for: ${targetId}`);
        return;
    }
    
    const html = appData.common_times.map(time => 
        `<button type="button" class="time-preset-btn" data-time="${time}">${time}</button>`
    ).join('');
    
    presetsContainer.innerHTML = html;
    
    // Add click listeners
    presetsContainer.querySelectorAll('.time-preset-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            selectTimePreset(targetId, this.dataset.time);
        });
    });
}

function toggleTimePresets(targetId) {
    const presetsEl = document.getElementById(`${targetId}Presets`);
    if (!presetsEl) return;
    
    // Hide other presets first
    document.querySelectorAll('.time-presets').forEach(el => {
        if (el.id !== `${targetId}Presets`) {
            el.classList.add('hidden');
        }
    });
    
    presetsEl.classList.toggle('hidden');
}

function hideAllTimePresets() {
    document.querySelectorAll('.time-presets').forEach(el => {
        el.classList.add('hidden');
    });
}

function selectTimePreset(targetId, time) {
    const input = document.getElementById(targetId);
    if (input) {
        input.value = time;
        clearFieldError(input);
        hideAllTimePresets();
        
        // Trigger change event for validation
        input.dispatchEvent(new Event('change', { bubbles: true }));
    }
}

// Form Validation System
function initializeFormValidation() {
    const form = document.getElementById('bookingForm');
    if (!form) {
        console.warn('Booking form not found');
        return;
    }
    
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Form fields
    const fields = {
        fromLocation: document.getElementById('fromLocation'),
        toLocation: document.getElementById('toLocation'),
        pickupTime: document.getElementById('pickupTime'),
        returnTime: document.getElementById('returnTime'),
        people: document.getElementById('people'),
        priceRange: document.getElementById('priceRange'),
        phone: document.getElementById('phone')
    };

    // Validation rules
    const validationRules = {
        fromLocation: {
            required: true,
            message: 'Please select a pickup location'
        },
        toLocation: {
            required: true,
            message: 'Please select a destination'
        },
        pickupTime: {
            required: true,
            message: 'Please select a pickup time'
        },
        returnTime: {
            required: true,
            message: 'Please select a return time'
        },
        people: {
            required: true,
            message: 'Please select number of people'
        },
        priceRange: {
            required: true,
            message: 'Please enter expected daily price'
        },
        phone: {
            required: true,
            pattern: /^[+]?[0-9\-\s()]{7,15}$/,
            message: 'Please enter a valid phone number'
        }
    };

    // Add real-time validation to each field
    Object.keys(fields).forEach(fieldName => {
        const field = fields[fieldName];
        if (!field) return;
        
        field.addEventListener('blur', function() {
            validateField(fieldName, field, validationRules[fieldName]);
        });
        
        field.addEventListener('change', function() {
            clearFieldError(field);
            validateField(fieldName, field, validationRules[fieldName]);
            
            // Special validations
            if (fieldName === 'fromLocation' || fieldName === 'toLocation') {
                setTimeout(() => checkFromToValidation(fields), 100);
            }
            
            if (fieldName === 'pickupTime' || fieldName === 'returnTime') {
                setTimeout(() => checkTimeValidation(fields), 100);
            }
        });
    });

    // Form submission
    // form.addEventListener('submit', function(e) {
    //     e.preventDefault();
    //     e.stopPropagation();
        
    //     console.log('Form submitted');
        
    //     // Clear any existing messages
    //     clearAllMessages(form);
        
    //     // Validate all fields
    //     let isValid = true;
    //     Object.keys(fields).forEach(fieldName => {
    //         const field = fields[fieldName];
    //         if (field && !validateField(fieldName, field, validationRules[fieldName])) {
    //             isValid = false;
    //         }
    //     });

    //     // Additional custom validations
    //     if (!checkFromToValidation(fields)) {
    //         isValid = false;
    //     }
        
    //     if (!checkTimeValidation(fields)) {
    //         isValid = false;
    //     }

    //     if (isValid) {
    //         submitWaitlistForm(form, submitButton, fields);
    //     } else {
    //         // Scroll to first error
    //         const firstError = form.querySelector('.form-control.error');
    //         if (firstError) {
    //             firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    //             setTimeout(() => firstError.focus(), 500);
    //         }
    //     }
    // });
    
    // Google Sheets integration
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyZgnczyu-83eCwPUgjTMShiXKuvlbXo-rR6swRql5CR4mD-wyQIpQxZnmPWsmZPNJb/exec';
    const formm = document.getElementById('bookingForm'); // Matches your HTML <form id="bookingForm">

    form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const fd = new FormData(formm);

    try {
        const res = await fetch(scriptURL, { method: 'POST', body: fd });
        if (!res.ok) throw new Error('Network response was not ok');

        // Success feedback
        alert("✅ Joined the waitlist successfully!");
        form.reset();

    } catch (err) {
        alert("❌ Something went wrong. Please try again.");
        console.error(err);
    }
    });


    // Validate individual field
    function validateField(fieldName, field, rule) {
        if (!field) return false;
        
        const value = field.value.trim();
        
        if (rule.required && !value) {
            showFieldError(field, rule.message);
            return false;
        }
        
        if (value && rule.pattern && !rule.pattern.test(value)) {
            showFieldError(field, rule.message);
            return false;
        }
        
        showFieldSuccess(field);
        return true;
    }
    
    console.log('Form validation initialized');
}

// Custom validation functions
function checkFromToValidation(fields) {
    const fromField = fields.fromLocation;
    const toField = fields.toLocation;
    
    if (!fromField || !toField) return true;
    
    if (fromField.value && toField.value && fromField.value === toField.value) {
        showFieldError(toField, 'Destination should be different from pickup location');
        return false;
    }
    
    return true;
}

function checkTimeValidation(fields) {
    const pickupTime = fields.pickupTime;
    const returnTime = fields.returnTime;
    
    if (!pickupTime || !returnTime) return true;
    
    if (pickupTime.value && returnTime.value) {
        const pickupMinutes = timeToMinutes(pickupTime.value);
        const returnMinutes = timeToMinutes(returnTime.value);
        
        if (pickupMinutes >= returnMinutes) {
            showFieldError(returnTime, 'Return time should be after pickup time');
            return false;
        }
        
        if (returnMinutes - pickupMinutes < 30) {
            showFieldError(returnTime, 'Return time should be at least 30 minutes after pickup time');
            return false;
        }
    }
    
    return true;
}

function timeToMinutes(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
}

// Form validation helper functions
function showFieldError(field, message) {
    if (!field) return;
    
    field.classList.remove('success');
    field.classList.add('error');
    
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    field.parentNode.appendChild(errorElement);
}

function showFieldSuccess(field) {
    if (!field) return;
    
    field.classList.remove('error');
    field.classList.add('success');
    
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function clearFieldError(field) {
    if (!field) return;
    
    field.classList.remove('error', 'success');
    
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function clearAllMessages(form) {
    const errorMessages = form.querySelectorAll('.error-message');
    const successMessages = form.querySelectorAll('.success-message');
    
    errorMessages.forEach(msg => msg.remove());
    successMessages.forEach(msg => msg.remove());
    
    const allFields = form.querySelectorAll('.form-control');
    allFields.forEach(field => field.classList.remove('error', 'success'));
}

// Waitlist Form Submission
function submitWaitlistForm(form, button, fields) {
    if (!button) return;
    
    console.log('Submitting waitlist form...');
    
    // Show loading state
    const originalHTML = button.innerHTML;
    button.innerHTML = 'Processing...';
    button.disabled = true;
    button.classList.add('btn--loading');
    
    // Collect form data
    const formData = {
        fromLocation: fields.fromLocation.value,
        fromCoordinates: {
            lat: fields.fromLocation.dataset.lat || null,
            lng: fields.fromLocation.dataset.lng || null
        },
        toLocation: fields.toLocation.value,
        toCoordinates: {
            lat: fields.toLocation.dataset.lat || null,
            lng: fields.toLocation.dataset.lng || null
        },
        pickupTime: fields.pickupTime.value,
        returnTime: fields.returnTime.value,
        people: fields.people.value,
        priceRange: fields.priceRange.value,
        language: currentLanguage,
        phone: fields.phone.value,
        timestamp: new Date().toISOString()
    };
    
    console.log('Form data collected:', formData);
    
    // Simulate API call
    setTimeout(() => {
        // Hide loading state
        button.innerHTML = originalHTML;
        button.disabled = false;
        button.classList.remove('btn--loading');
        
        // Show success message
        showWaitlistSuccessMessage(form);
        // Confetti on success
        try {
            if (window.confetti) {
                window.confetti({
                    particleCount: 120,
                    spread: 70,
                    origin: { y: 0 },
                    startVelocity: 50,
                    ticks: 200
                });
            }
        } catch (_) {}
        
        console.log('Waitlist signup completed');
        
        // Reset form after success
        setTimeout(() => {
            form.reset();
            Object.values(fields).forEach(field => {
                if (field) {
                    clearFieldError(field);
                    field.removeAttribute('data-lat');
                    field.removeAttribute('data-lng');
                }
            });
            clearAllMessages(form);
            hideAllTimePresets();
            
            // Hide maps
            hideMap('from');
            hideMap('to');
        }, 5000);
        
    }, 2000);
}

function showWaitlistSuccessMessage(form) {
    const existingSuccess = form.querySelector('.success-message');
    if (existingSuccess) {
        existingSuccess.remove();
    }
    
    const successElement = document.createElement('div');
    successElement.className = 'success-message';
    successElement.innerHTML = currentLanguage === 'en' ?
        `<strong>🎉 Welcome to the VAMOS Waitlist!</strong><br>
         You'll be among the first to know when we launch in your area. We'll send you updates and early access information soon!` :
        `<strong>🎉 VAMOS वेटलिस्ट में आपका स्वागत है!</strong><br>
         जब हम आपके क्षेत्र में लॉन्च करेंगे तो आप पहले जानने वालों में होंगे। हम आपको अपडेट और प्रारंभिक पहुंच की जानकारी जल्द ही भेजेंगे!`;
    
    form.appendChild(successElement);
    
    setTimeout(() => {
        successElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
}

// Smooth scrolling for navigation
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
            }
        });
    });
    
    console.log('Smooth scrolling initialized');
}

// Mobile optimizations
function initializeMobileOptimizations() {
    // Improve touch interactions on mobile
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Improve button feedback
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('touchstart', function() {
                this.classList.add('btn--pressed');
            });
            
            button.addEventListener('touchend', function() {
                const btn = this;
                setTimeout(() => {
                    btn.classList.remove('btn--pressed');
                }, 150);
            });
            
            button.addEventListener('touchcancel', function() {
                this.classList.remove('btn--pressed');
            });
        });
    }
    
    // Handle screen orientation changes
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            // Refresh maps if visible
            Object.values(maps).forEach(map => {
                if (map) {
                    map.invalidateSize();
                }
            });
        }, 100);
    });
    
    console.log('Mobile optimizations initialized');
}

// Add CSS for additional interactions
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .btn--pressed {
        transform: scale(0.98) !important;
        transition: transform 0.1s !important;
    }
    
    .suggestion-item.highlighted {
        background: var(--color-primary) !important;
        color: white !important;
    }
    
    .suggestion-item.highlighted .suggestion-type {
        color: rgba(255, 255, 255, 0.8) !important;
    }
`;
document.head.appendChild(additionalStyles);

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});

// Initialize intersection observer for animations after page load
window.addEventListener('load', function() {
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements that should animate in
        const elementsToAnimate = document.querySelectorAll(
            '.feature-card, .step, .testimonial, .stat, .timeline-item'
        );
        elementsToAnimate.forEach(el => {
            if (el) observer.observe(el);
        });

        // Safety net: if for any reason elements remain hidden, reveal them after a short delay
        setTimeout(() => {
            document.querySelectorAll('.feature-card, .step, .testimonial, .stat, .timeline-item').forEach(el => {
                if (el && !el.classList.contains('animate-in')) {
                    el.classList.add('animate-in');
                }
            });
        }, 1500);
    } else {
        // Fallback for browsers without IntersectionObserver
        document.querySelectorAll('.feature-card, .step, .testimonial, .stat, .timeline-item').forEach(el => {
            if (el) el.classList.add('animate-in');
        });
    }
    
    console.log('VAMOS Enhanced App Fully Loaded and Animated! 🚗✨');
});