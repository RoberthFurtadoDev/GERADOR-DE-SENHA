// Elementos DOM
const passwordField = document.getElementById("password");
const copyBtn = document.getElementById("copy-btn");
const generateBtn = document.getElementById("generate-btn");
const lengthInput = document.getElementById("length");
const lengthVal = document.getElementById("length-val");
const uppercaseCheck = document.getElementById("uppercase");
const lowercaseCheck = document.getElementById("lowercase");
const numbersCheck = document.getElementById("numbers");
const symbolsCheck = document.getElementById("symbols");
const themeBtn = document.getElementById("theme-btn");
const strengthBar = document.querySelector(".strength-bar");
const strengthText = document.querySelector(".strength-text");

// Caracteres para senha
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

// Gerar senha
function generatePassword() {
    let length = lengthInput.value;
    let charset = "";
    let password = "";

    if (uppercaseCheck.checked) charset += uppercaseChars;
    if (lowercaseCheck.checked) charset += lowercaseChars;
    if (numbersCheck.checked) charset += numberChars;
    if (symbolsCheck.checked) charset += symbolChars;
    
    if (charset === "") {
        passwordField.value = "Selecione pelo menos uma opção";
        updateStrengthIndicator(0);
        return;
    }

    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    
    passwordField.value = password;
    checkPasswordStrength(password);
}

// Verificar força da senha
function checkPasswordStrength(password) {
    let strength = 0;
    
    // Critérios de força
    if (password.length >= 12) strength += 1;
    if (password.length >= 16) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 2;
    
    updateStrengthIndicator(strength);
}

// Atualizar indicador visual de força
function updateStrengthIndicator(strength) {
    const maxStrength = 6;
    const percentage = (strength / maxStrength) * 100;
    
    strengthBar.style.width = `${percentage}%`;
    
    if (strength <= 2) {
        strengthBar.style.backgroundColor = "var(--strength-weak)";
        strengthText.textContent = "Força: Fraca";
    } else if (strength <= 4) {
        strengthBar.style.backgroundColor = "var(--strength-medium)";
        strengthText.textContent = "Força: Média";
    } else {
        strengthBar.style.backgroundColor = "var(--strength-strong)";
        strengthText.textContent = "Força: Forte";
    }
}

// Copiar senha
function copyToClipboard() {
    if (!passwordField.value || passwordField.value === "Selecione pelo menos uma opção") return;
    
    navigator.clipboard.writeText(passwordField.value).then(() => {
        copyBtn.textContent = "✅";
        setTimeout(() => copyBtn.textContent = "📋", 2000);
    });
}

// Alternar tema claro/escuro
function toggleTheme() {
    document.body.classList.toggle("light-mode");
    document.body.classList.toggle("dark-mode");
    
    // Salvar preferência
    const isLightMode = document.body.classList.contains("light-mode");
    localStorage.setItem("lightMode", isLightMode);
}

// Carregar preferência de tema
function loadThemePreference() {
    const lightMode = localStorage.getItem("lightMode") === "true";
    if (lightMode) {
        document.body.classList.add("light-mode");
        document.body.classList.remove("dark-mode");
    }
}

// Atualizar range background
function updateRangeBackground() {
    const value = lengthInput.value;
    const min = lengthInput.min;
    const max = lengthInput.max;
    const percent = ((value - min) / (max - min)) * 100;
    lengthInput.style.setProperty("--progress", percent + "%");
}

// Event Listeners
lengthInput.addEventListener("input", () => {
    lengthVal.textContent = lengthInput.value;
    updateRangeBackground();
});

generateBtn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click", copyToClipboard);
themeBtn.addEventListener("click", toggleTheme);

// Inicialização
updateRangeBackground();
loadThemePreference();

// Gerar senha inicial
generatePassword();