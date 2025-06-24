// 主题切换功能
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme');

// 检查用户系统偏好或本地存储
if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
    `;
    themeToggle.title = "切换到浅色模式";
}

// 切换主题函数
function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    
    if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
        `;
        themeToggle.title = "切换到深色模式";
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
        `;
        themeToggle.title = "切换到浅色模式";
    }
}

// 添加事件监听
themeToggle.addEventListener('click', toggleTheme);

// 监听系统主题变化
prefersDarkScheme.addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
        if (e.matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            `;
            themeToggle.title = "切换到浅色模式";
        } else {
            document.documentElement.removeAttribute('data-theme');
            themeToggle.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
            `;
            themeToggle.title = "切换到深色模式";
        }
    }
});


// 全局变量
let currentInput = '0';
let previousInput = '';
let operation = null;
let resetInput = false;
let memoryValue = null;
let bitMode = 32;
let currentBase = 'dec';
let isSigned = false;
let history = [];
let isDarkMode = true;

// DOM元素
const resultDisplay = document.getElementById('result');
const historyDisplay = document.getElementById('history-display');
const memoryIndicator = document.getElementById('memory-indicator');
const historyButton = document.getElementById('history-button');
const memoryButton = document.getElementById('memory-button');
const historyPanel = document.getElementById('history-panel');
const historyList = document.getElementById('history-list');

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    initCalculator();
    setupEventListeners();
    updateCurrencyRates();
});

function initCalculator() {
    updateDisplay();
    updateMemoryIndicator();
    updateUnitOptions();
    
    // 设置默认日期
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('start-date').value = today;
    document.getElementById('end-date').value = today;
}

function setupEventListeners() {
    // 模式切换
    document.querySelectorAll('.mode-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const mode = this.dataset.mode;
            switchMode(mode);
            
            document.querySelectorAll('.mode-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 历史记录按钮
    historyButton.addEventListener('click', toggleHistoryPanel);
    
    // 内存按钮
    memoryButton.addEventListener('click', memoryRecall);
    
    // 内存按钮长按功能
    let memoryLongPress;
    memoryButton.addEventListener('mousedown', function() {
        memoryLongPress = setTimeout(function() {
            memoryClear();
        }, 1000);
    });
    
    memoryButton.addEventListener('mouseup', function() {
        clearTimeout(memoryLongPress);
    });
    
    memoryButton.addEventListener('mouseleave', function() {
        clearTimeout(memoryLongPress);
    });
    
    // 单位类型变化监听
    document.getElementById('from-unit-type').addEventListener('change', updateUnitOptions);
    document.getElementById('to-unit-type').addEventListener('change', updateUnitOptions);
    
    // 键盘支持
    document.addEventListener('keydown', handleKeyDown);
    
    // 实时单位转换
    document.getElementById('from-value').addEventListener('input', function() {
        if (this.value && !isNaN(this.value)) {
            convertUnits();
        }
    });
}

// 计算器基本功能
function updateDisplay() {
    resultDisplay.textContent = currentInput;
    historyDisplay.textContent = previousInput + (operation ? ' ' + operation : '');
    
    // 自动调整字体大小
    const resultLength = currentInput.length;
    if (resultLength > 15) {
        resultDisplay.style.fontSize = '30px';
    } else if (resultLength > 10) {
        resultDisplay.style.fontSize = '35px';
    } else {
        resultDisplay.style.fontSize = '40px';
    }
}

function appendNumber(number) {
    if (currentInput === '0' || resetInput) {
        currentInput = number;
        resetInput = false;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function appendDecimal() {
    if (resetInput) {
        currentInput = '0.';
        resetInput = false;
        updateDisplay();
        return;
    }
    
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
}

function appendOperator(op) {
    const inputValue = parseFloat(currentInput);
    
    if (operation && !resetInput) {
        calculate();
    }
    
    previousInput = currentInput;
    operation = op;
    resetInput = true;
    updateDisplay();
}

function appendFunction(func) {
    if (resetInput) {
        currentInput = func;
        resetInput = false;
    } else {
        currentInput += func;
    }
    updateDisplay();
}

// 替换原有的calculate函数
function calculate() {
    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    // 将数字转换为整数进行计算
    const adjustDecimals = (num) => {
        const decimalPlaces = (num.toString().split('.')[1] || '').length;
        return { value: num, decimals: decimalPlaces };
    };
    
    const a = adjustDecimals(prev);
    const b = adjustDecimals(current);
    
    const maxDecimals = Math.max(a.decimals, b.decimals);
    const factor = Math.pow(10, maxDecimals);
    
    switch (operation) {
        case '+':
            computation = (prev + current).toFixed(maxDecimals);
            break;
        case '-':
            computation = (prev - current).toFixed(maxDecimals);
            break;
        case '*':
            // 转换为整数计算后再转换回来
            computation = (prev * factor * current * factor) / (factor * factor);
            // 最大保留10位小数
            computation = parseFloat(computation.toFixed(10));
            break;
        case '/':
            computation = prev / current;
            // 最大保留10位小数
            computation = parseFloat(computation.toFixed(10));
            break;
        // ...其他运算符...
    }
    
    // 去除不必要的尾随零和小数点
    currentInput = computation.toString().replace(/(\.\d*?[1-9])0+$/, '$1').replace(/\.$/, '');
    operation = null;
    previousInput = '';
    resetInput = true;
    updateDisplay();
}

function clearAll() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    updateDisplay();
}

function backspace() {
    if (currentInput.length === 1 || (currentInput.length === 2 && currentInput.startsWith('-'))) {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

// 科学计算函数
function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// 程序员计算器功能
function appendProgrammerNumber(button) {
    let value;
    switch (currentBase) {
        case 'hex':
            value = button.dataset.hex || button.textContent;
            break;
        case 'dec':
            value = button.dataset.dec || button.textContent;
            break;
        case 'oct':
            value = button.dataset.oct || button.textContent;
            break;
        case 'bin':
            value = button.dataset.bin || button.textContent;
            break;
        default:
            value = button.textContent;
    }
    
    appendNumber(value);
}

function setBitMode(bits) {
    bitMode = bits;
    updateDisplay();
}

function toggleBitMode() {
    isSigned = !isSigned;
    if (isSigned && !currentInput.startsWith('-')) {
        currentInput = '-' + currentInput;
    } else if (!isSigned && currentInput.startsWith('-')) {
        currentInput = currentInput.substring(1);
    }
    updateDisplay();
}

function switchBase(newBase) {
    if (currentBase === newBase) return;
    
    try {
        const converted = convertBase(currentInput, currentBase, newBase);
        currentBase = newBase;
        currentInput = converted;
        
        // 更新UI
        document.querySelectorAll('.base-button').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.base === newBase);
        });
        
        updateDisplay();
    } catch (e) {
        console.error("进制转换错误:", e);
        currentInput = "错误";
        updateDisplay();
    }
}

function convertBase(value, fromBase, toBase) {
    const bases = {
        'hex': 16,
        'dec': 10,
        'oct': 8,
        'bin': 2
    };
    
    const from = bases[fromBase];
    const to = bases[toBase];
    
    if (from === 10) {
        return parseInt(value, from).toString(to);
    } else if (to === 10) {
        return parseInt(value, from).toString();
    } else {
        const decimalValue = parseInt(value, from);
        return decimalValue.toString(to).toUpperCase();
    }
}

// 日期计算功能
function setToday(dateFieldId) {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById(dateFieldId).value = today;
}

function calculateDateDifference() {
    const startDate = new Date(document.getElementById('start-date').value);
    const endDate = new Date(document.getElementById('end-date').value);
    
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        document.getElementById('date-result').textContent = "无效日期";
        return;
    }
    
    const diffMs = endDate - startDate;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    
    // 计算月份和年份差异
    let months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
    months -= startDate.getMonth();
    months += endDate.getMonth();
    months = months <= 0 ? 0 : months;
    
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    document.getElementById('date-result').innerHTML = `
        <div>总天数: ${diffDays}</div>
        <div>总周数: ${diffWeeks}</div>
        <div>总月数: ${months}</div>
        <div>总年数: ${years} 年 ${remainingMonths} 个月</div>
    `;
    
    // 添加到历史记录
    addToHistory(
        `日期差异: ${document.getElementById('start-date').value} 到 ${document.getElementById('end-date').value}`,
        `${diffDays} 天 / ${diffWeeks} 周 / ${months} 月 / ${years} 年`
    );
}

function addToDate() {
    const dateField = document.getElementById('start-date');
    const value = parseInt(document.getElementById('date-diff-value').value);
    const unit = document.getElementById('date-diff-unit').value;
    
    const date = new Date(dateField.value);
    if (isNaN(date.getTime())) return;
    
    switch (unit) {
        case 'days':
            date.setDate(date.getDate() + value);
            break;
        case 'weeks':
            date.setDate(date.getDate() + (value * 7));
            break;
        case 'months':
            date.setMonth(date.getMonth() + value);
            break;
        case 'years':
            date.setFullYear(date.getFullYear() + value);
            break;
    }
    
    const resultDate = date.toISOString().split('T')[0];
    document.getElementById('end-date').value = resultDate;
    
    // 添加到历史记录
    addToHistory(
        `添加 ${value} ${unit} 到 ${dateField.value}`,
        resultDate
    );
}

function subtractFromDate() {
    const dateField = document.getElementById('start-date');
    const value = parseInt(document.getElementById('date-diff-value').value);
    const unit = document.getElementById('date-diff-unit').value;
    
    const date = new Date(dateField.value);
    if (isNaN(date.getTime())) return;
    
    switch (unit) {
        case 'days':
            date.setDate(date.getDate() - value);
            break;
        case 'weeks':
            date.setDate(date.getDate() - (value * 7));
            break;
        case 'months':
            date.setMonth(date.getMonth() - value);
            break;
        case 'years':
            date.setFullYear(date.getFullYear() - value);
            break;
    }
    
    const resultDate = date.toISOString().split('T')[0];
    document.getElementById('end-date').value = resultDate;
    
    // 添加到历史记录
    addToHistory(
        `减去 ${value} ${unit} 从 ${dateField.value}`,
        resultDate
    );
}

function swapDates() {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    
    document.getElementById('start-date').value = endDate;
    document.getElementById('end-date').value = startDate;
}

function clearDates() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('start-date').value = today;
    document.getElementById('end-date').value = today;
    document.getElementById('date-result').textContent = "";
}

// 单位转换功能
function updateUnitOptions() {
    const fromType = document.getElementById('from-unit-type').value;
    const toType = document.getElementById('to-unit-type').value;
    
    const fromUnitSelect = document.getElementById('from-unit');
    const toUnitSelect = document.getElementById('to-unit');
    
    // 清空现有选项
    fromUnitSelect.innerHTML = '';
    toUnitSelect.innerHTML = '';
    
    // 添加温度单位的特殊处理
    if (fromType === 'temperature') {
        const tempUnits = ['celsius', 'fahrenheit', 'kelvin'];
        tempUnits.forEach(unit => {
            const option = document.createElement('option');
            option.value = unit;
            option.textContent = unit.charAt(0).toUpperCase() + unit.slice(1);
            fromUnitSelect.appendChild(option);
            
            const option2 = document.createElement('option');
            option2.value = unit;
            option2.textContent = unit.charAt(0).toUpperCase() + unit.slice(1);
            toUnitSelect.appendChild(option2);
        });
        return;
    }
    
    // 添加货币单位的特殊处理
    if (fromType === 'currency') {
        Object.keys(unitConversions.currency).forEach(currency => {
            const option = document.createElement('option');
            option.value = currency;
            option.textContent = currency;
            fromUnitSelect.appendChild(option);
            
            const option2 = document.createElement('option');
            option2.value = currency;
            option2.textContent = currency;
            toUnitSelect.appendChild(option2);
        });
        return;
    }
    
    // 添加普通单位
    if (unitConversions[fromType]) {
        Object.keys(unitConversions[fromType]).forEach(unit => {
            const option = document.createElement('option');
            option.value = unit;
            option.textContent = unit.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            fromUnitSelect.appendChild(option);
        });
    }
    
    if (unitConversions[toType]) {
        Object.keys(unitConversions[toType]).forEach(unit => {
            const option = document.createElement('option');
            option.value = unit;
            option.textContent = unit.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            toUnitSelect.appendChild(option);
        });
    }
    
    // 设置默认选项
    if (fromUnitSelect.options.length > 0) fromUnitSelect.selectedIndex = 0;
    if (toUnitSelect.options.length > 0) toUnitSelect.selectedIndex = 0;
    
    // 自动转换
    convertUnits();
}

function convertUnits() {
    const fromType = document.getElementById('from-unit-type').value;
    const toType = document.getElementById('to-unit-type').value;
    const fromUnit = document.getElementById('from-unit').value;
    const toUnit = document.getElementById('to-unit').value;
    const fromValue = parseFloat(document.getElementById('from-value').value);
    
    if (isNaN(fromValue)) {
        document.getElementById('to-value').value = "";
        return;
    }
    
    // 温度转换特殊处理
    if (fromType === 'temperature' && toType === 'temperature') {
        let result;
        const celsiusToFahrenheit = c => (c * 9/5) + 32;
        const fahrenheitToCelsius = f => (f - 32) * 5/9;
        const celsiusToKelvin = c => c + 273.15;
        const kelvinToCelsius = k => k - 273.15;
        
        if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
            result = celsiusToFahrenheit(fromValue);
        } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
            result = fahrenheitToCelsius(fromValue);
        } else if (fromUnit === 'celsius' && toUnit === 'kelvin') {
            result = celsiusToKelvin(fromValue);
        } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
            result = kelvinToCelsius(fromValue);
        } else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') {
            result = celsiusToKelvin(fahrenheitToCelsius(fromValue));
        } else if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') {
            result = celsiusToFahrenheit(kelvinToCelsius(fromValue));
        } else {
            result = fromValue; // 相同单位
        }
        
        document.getElementById('to-value').value = result.toFixed(6);
        return;
    }
    
    // 货币转换特殊处理
    if (fromType === 'currency' && toType === 'currency') {
        if (unitConversions.currency[fromUnit] && unitConversions.currency[toUnit]) {
            const rate = unitConversions.currency[toUnit] / unitConversions.currency[fromUnit];
            const result = fromValue * rate;
            document.getElementById('to-value').value = result.toFixed(6);
            
            // 添加到历史记录
            addToHistory(
                `${fromValue} ${fromUnit} 到 ${toUnit}`,
                `${result.toFixed(4)} ${toUnit}`
            );
        } else {
            document.getElementById('to-value').value = "汇率未更新";
        }
        return;
    }
    
    // 普通单位转换
    if (unitConversions[fromType] && unitConversions[fromType][fromUnit] && 
        unitConversions[toType] && unitConversions[toType][toUnit]) {
        
        // 转换为基准单位
        const baseValue = fromValue * unitConversions[fromType][fromUnit];
        // 从基准单位转换为目标单位
        const result = baseValue / unitConversions[toType][toUnit];
        
        document.getElementById('to-value').value = result.toFixed(6);
        
        // 添加到历史记录
        addToHistory(
            `${fromValue} ${fromUnit} 到 ${toUnit}`,
            `${result.toFixed(4)} ${toUnit}`
        );
    } else {
        document.getElementById('to-value').value = "无法转换";
    }
}

function swapUnits() {
    const fromType = document.getElementById('from-unit-type').value;
    const toType = document.getElementById('to-unit-type').value;
    const fromUnit = document.getElementById('from-unit').value;
    const toUnit = document.getElementById('to-unit').value;
    const fromValue = document.getElementById('from-value').value;
    const toValue = document.getElementById('to-value').value;
    
    // 交换单位类型
    document.getElementById('from-unit-type').value = toType;
    document.getElementById('to-unit-type').value = fromType;
    
    // 更新单位选项
    updateUnitOptions();
    
    // 设置交换后的单位
    document.getElementById('from-unit').value = toUnit;
    document.getElementById('to-unit').value = fromUnit;
    
    // 交换值
    document.getElementById('from-value').value = toValue;
    document.getElementById('to-value').value = fromValue;
}

function clearConverter() {
    document.getElementById('from-value').value = "1";
    document.getElementById('to-value').value = "";
}

async function updateCurrencyRates() {
    try {
        // 这里应该调用实际的汇率API，以下是模拟数据
        unitConversions.currency = {
            USD: 1,
            EUR: 0.92,
            GBP: 0.79,
            JPY: 151.43,
            CNY: 7.23,
            AUD: 1.52,
            CAD: 1.37,
            CHF: 0.91,
            HKD: 7.83,
            SGD: 1.35
        };
        
        alert("汇率已更新");
    } catch (error) {
        console.error("更新汇率失败:", error);
        alert("更新汇率失败，请重试");
    }
}

// 历史记录功能
function addToHistory(expression, result) {
    history.unshift({ 
        expression, 
        result,
        timestamp: new Date().toLocaleString()
    });
    if (history.length > 50) {
        history.pop();
    }
    updateHistoryPanel();
}

function updateHistoryPanel() {
    historyList.innerHTML = '';
    
    if (history.length === 0) {
        const emptyMsg = document.createElement('div');
        emptyMsg.className = 'history-empty';
        emptyMsg.textContent = '没有历史记录';
        historyList.appendChild(emptyMsg);
        return;
    }
    
    history.forEach((item, index) => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        
        const itemHeader = document.createElement('div');
        itemHeader.className = 'history-item-header';
        
        const timestamp = document.createElement('span');
        timestamp.className = 'history-timestamp';
        timestamp.textContent = item.timestamp;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'history-delete';
        deleteBtn.innerHTML = '&times;';
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            history.splice(index, 1);
            updateHistoryPanel();
        };
        
        const expr = document.createElement('div');
        expr.className = 'history-expression';
        expr.textContent = item.expression;
        
        const res = document.createElement('div');
        res.className = 'history-result';
        res.textContent = `= ${item.result}`;
        
        historyItem.onclick = () => {
            currentInput = item.result;
            updateDisplay();
            toggleHistoryPanel();
        };
        
        itemHeader.appendChild(timestamp);
        itemHeader.appendChild(deleteBtn);
        historyItem.appendChild(itemHeader);
        historyItem.appendChild(expr);
        historyItem.appendChild(res);
        historyList.appendChild(historyItem);
    });
}

function toggleHistoryPanel() {
    historyPanel.classList.toggle('show');
}

// 内存功能
function updateMemoryIndicator() {
    if (memoryValue !== null) {
        memoryIndicator.textContent = `M: ${memoryValue}`;
        memoryButton.title = `内存值: ${memoryValue}\n点击: 调用内存\n长按: 清除内存`;
    } else {
        memoryIndicator.textContent = "";
        memoryButton.title = "内存为空";
    }
}

function memoryStore() {
    const value = parseFloat(currentInput);
    if (!isNaN(value)) {
        memoryValue = value;
        updateMemoryIndicator();
    }
}

function memoryRecall() {
    if (memoryValue !== null) {
        currentInput = memoryValue.toString();
        updateDisplay();
    }
}

function memoryAdd() {
    const value = parseFloat(currentInput);
    if (!isNaN(value) && memoryValue !== null) {
        memoryValue += value;
        updateMemoryIndicator();
    }
}

function memorySubtract() {
    const value = parseFloat(currentInput);
    if (!isNaN(value) && memoryValue !== null) {
        memoryValue -= value;
        updateMemoryIndicator();
    }
}

function memoryClear() {
    memoryValue = null;
    updateMemoryIndicator();
}

// 模式切换
function switchMode(mode) {
    const currentPanel = document.querySelector('.panel.active');
    const newPanel = document.getElementById(`${mode}-panel`);
    
    if (currentPanel) {
        currentPanel.classList.remove('active');
        setTimeout(() => {
            newPanel.classList.add('active');
        }, 200);
    } else {
        newPanel.classList.add('active');
    }
    
    // 重置计算器状态
    currentInput = '0';
    previousInput = '';
    operation = null;
    updateDisplay();
}

// 键盘处理
function handleKeyDown(e) {
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
        return;
    }
    
    switch(e.key) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '%':
            appendOperator(e.key);
            break;
        case '.':
            appendDecimal();
            break;
        case 'Enter':
        case '=':
            calculate();
            break;
        case 'Backspace':
            backspace();
            break;
            case 'Escape':
                clearAll();
                break;
            case '(':
            case ')':
                appendFunction(e.key);
                break;
            case 'm':
            case 'M':
                if (e.ctrlKey) {
                    memoryStore();
                } else {
                    memoryRecall();
                }
                break;
        }
    }
    
    // 单位转换相关变量
    const unitConversions = {
        length: {
            meters: 1,
            kilometers: 1000,
            centimeters: 0.01,
            millimeters: 0.001,
            miles: 1609.344,
            yards: 0.9144,
            feet: 0.3048,
            inches: 0.0254,
            nauticalMiles: 1852
        },
        area: {
            squareMeters: 1,
            squareKilometers: 1000000,
            squareCentimeters: 0.0001,
            squareMillimeters: 0.000001,
            squareMiles: 2589988.11,
            squareYards: 0.83612736,
            squareFeet: 0.09290304,
            squareInches: 0.00064516,
            acres: 4046.8564224,
            hectares: 10000
        },
        volume: {
            liters: 1,
            milliliters: 0.001,
            cubicMeters: 1000,
            cubicCentimeters: 0.001,
            cubicMillimeters: 0.000001,
            gallons: 3.785411784,
            quarts: 0.946352946,
            pints: 0.473176473,
            cups: 0.2365882365,
            fluidOunces: 0.0295735295625,
            tablespoons: 0.01478676478125,
            teaspoons: 0.00492892159375
        },
        weight: {
            kilograms: 1,
            grams: 0.001,
            milligrams: 0.000001,
            metricTons: 1000,
            pounds: 0.45359237,
            ounces: 0.028349523125,
            stones: 6.35029318,
            tons: 907.18474
        },
        temperature: {
            celsius: 1,
            fahrenheit: 1,
            kelvin: 1
        },
        energy: {
            joules: 1,
            kilojoules: 1000,
            calories: 4.184,
            kilocalories: 4184,
            wattHours: 3600,
            kilowattHours: 3600000,
            electronvolts: 1.602176634e-19,
            britishThermalUnits: 1055.05585262,
            usTherms: 105480400,
            footPounds: 1.3558179483314004
        },
        pressure: {
            pascals: 1,
            kilopascals: 1000,
            megapascals: 1000000,
            bars: 100000,
            psi: 6894.757293168361,
            atm: 101325,
            torr: 133.32236842105263
        },
        speed: {
            metersPerSecond: 1,
            kilometersPerHour: 0.277778,
            milesPerHour: 0.44704,
            knots: 0.514444,
            feetPerSecond: 0.3048
        },
        time: {
            seconds: 1,
            milliseconds: 0.001,
            microseconds: 0.000001,
            nanoseconds: 0.000000001,
            minutes: 60,
            hours: 3600,
            days: 86400,
            weeks: 604800,
            years: 31536000,
            decades: 315360000,
            centuries: 3153600000
        },
        power: {
            watts: 1,
            kilowatts: 1000,
            megawatts: 1000000,
            horsepower: 745.6998715822701,
            footPoundsPerMinute: 0.0225969658055233,
            btusPerMinute: 17.584264210333
        },
        data: {
            bytes: 1,
            kilobytes: 1024,
            megabytes: 1048576,
            gigabytes: 1073741824,
            terabytes: 1099511627776,
            petabytes: 1125899906842624,
            bits: 0.125,
            kilobits: 128,
            megabits: 131072,
            gigabits: 134217728,
            terabits: 137438953472,
            petabits: 140737488355328
        },
        angle: {
            degrees: 1,
            radians: 57.29577951308232,
            gradians: 0.9,
            arcminutes: 0.016666666666666666,
            arcseconds: 0.0002777777777777778
        },
        currency: {
            USD: 1,
            EUR: 0.92,
            GBP: 0.79,
            JPY: 151.43,
            CNY: 7.23,
            AUD: 1.52,
            CAD: 1.37,
            CHF: 0.91,
            HKD: 7.83,
            SGD: 1.35
        }
    };
    
    // 主题切换功能
    function toggleTheme() {
        isDarkMode = !isDarkMode;
        document.documentElement.style.setProperty('--bg-color', isDarkMode ? '#202020' : '#f0f0f0');
        document.documentElement.style.setProperty('--button-color', isDarkMode ? '#2d2d2d' : '#e0e0e0');
        document.documentElement.style.setProperty('--function-color', isDarkMode ? '#1a1a1a' : '#d0d0d0');
        document.documentElement.style.setProperty('--operator-color', isDarkMode ? '#0078d7' : '#0078d7');
        document.documentElement.style.setProperty('--text-color', isDarkMode ? '#ffffff' : '#000000');
        document.documentElement.style.setProperty('--highlight-color', isDarkMode ? '#3d3d3d' : '#c0c0c0');
        document.documentElement.style.setProperty('--acrylic-bg', isDarkMode ? 'rgba(32, 32, 32, 0.7)' : 'rgba(240, 240, 240, 0.7)');
    }
    
    // 添加主题切换按钮
    function addThemeSwitcher() {
        const themeBtn = document.createElement('button');
        themeBtn.className = 'theme-btn';
        themeBtn.innerHTML = isDarkMode ? '☀️' : '🌙';
        themeBtn.onclick = function() {
            toggleTheme();
            this.innerHTML = isDarkMode ? '☀️' : '🌙';
        };
        
        const themeContainer = document.createElement('div');
        themeContainer.className = 'theme-switcher';
        themeContainer.appendChild(themeBtn);
        document.body.appendChild(themeContainer);
    }
    
    // 初始化主题切换
    addThemeSwitcher();
    
    // 事件委托处理所有按钮点击
    document.addEventListener('click', function(e) {
        const button = e.target.closest('button');
        if (!button) return;
        
        const action = button.dataset.action;
        if (!action) return;
        
        switch(action) {
            case 'appendNumber':
                appendNumber(button.dataset.number);
                break;
            case 'appendOperator':
                appendOperator(button.dataset.operator);
                break;
            case 'appendFunction':
                appendFunction(button.dataset.function);
                break;
            case 'appendDecimal':
                appendDecimal();
                break;
            case 'calculate':
                calculate();
                break;
            case 'clearAll':
                clearAll();
                break;
            case 'backspace':
                backspace();
                break;
            case 'appendProgrammerNumber':
                appendProgrammerNumber(button);
                break;
            case 'setBitMode':
                setBitMode(parseInt(button.dataset.bits));
                break;
            case 'toggleBitMode':
                toggleBitMode();
                break;
            case 'switchBase':
                switchBase(button.dataset.base);
                break;
            case 'setToday':
                setToday(button.dataset.field);
                break;
            case 'calculateDateDifference':
                calculateDateDifference();
                break;
            case 'addToDate':
                addToDate();
                break;
            case 'subtractFromDate':
                subtractFromDate();
                break;
            case 'swapDates':
                swapDates();
                break;
            case 'clearDates':
                clearDates();
                break;
            case 'swapUnits':
                swapUnits();
                break;
            case 'clearConverter':
                clearConverter();
                break;
            case 'updateCurrencyRates':
                updateCurrencyRates();
                break;
            case 'convertUnits':
                convertUnits();
                break;
            case 'toggleHistoryPanel':
                toggleHistoryPanel();
                break;
            case 'memoryStore':
                memoryStore();
                break;
            case 'memoryRecall':
                memoryRecall();
                break;
            case 'memoryAdd':
                memoryAdd();
                break;
            case 'memorySubtract':
                memorySubtract();
                break;
            case 'memoryClear':
                memoryClear();
                break;
        }
    });
    
    // 添加右键菜单功能
    document.addEventListener('contextmenu', function(e) {
        const button = e.target.closest('button');
        if (!button) return;
        
        e.preventDefault();
        
        const action = button.dataset.action;
        if (!action) return;
        
        switch(action) {
            case 'appendOperator':
                if (button.dataset.operator === '/') {
                    memoryStore();
                }
                break;
            case 'appendNumber':
                if (button.dataset.number === '0') {
                    memoryClear();
                }
                break;
        }
    });
    
    // 添加触摸设备支持
    let touchStartTime = 0;
    document.addEventListener('touchstart', function(e) {
        const button = e.target.closest('button');
        if (!button) return;
        
        touchStartTime = Date.now();
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        const button = e.target.closest('button');
        if (!button) return;
        
        const touchDuration = Date.now() - touchStartTime;
        if (touchDuration > 1000) {
            // 长按处理
            if (button === memoryButton) {
                memoryClear();
            }
        }
    }, { passive: true });
    
    // 添加动画效果
    function animateButton(button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 100);
    }
    
    // 增强的按钮点击效果
    document.addEventListener('mousedown', function(e) {
        const button = e.target.closest('button');
        if (!button) return;
        
        animateButton(button);
    }, { passive: true });
    
    // 添加窗口大小变化监听
    window.addEventListener('resize', function() {
        updateDisplay(); // 重新计算显示字体大小
    });
    
    // 添加计算器状态保存
    function saveCalculatorState() {
        const state = {
            currentInput,
            previousInput,
            operation,
            resetInput,
            memoryValue,
            bitMode,
            currentBase,
            isSigned,
            history,
            isDarkMode
        };
        localStorage.setItem('calculatorState', JSON.stringify(state));
    }
    
    function loadCalculatorState() {
        const savedState = localStorage.getItem('calculatorState');
        if (savedState) {
            const state = JSON.parse(savedState);
            currentInput = state.currentInput || '0';
            previousInput = state.previousInput || '';
            operation = state.operation || null;
            resetInput = state.resetInput || false;
            memoryValue = state.memoryValue || null;
            bitMode = state.bitMode || 32;
            currentBase = state.currentBase || 'dec';
            isSigned = state.isSigned || false;
            history = state.history || [];
            isDarkMode = state.isDarkMode !== undefined ? state.isDarkMode : true;
            
            // 应用主题
            toggleTheme();
            document.querySelector('.theme-btn').innerHTML = isDarkMode ? '☀️' : '🌙';
            
            updateDisplay();
            updateMemoryIndicator();
            updateHistoryPanel();
        }
    }
    
    // 初始化时加载状态
    loadCalculatorState();
    
    // 定期保存状态
    setInterval(saveCalculatorState, 5000);
    
    // 添加页面可见性变化监听
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            loadCalculatorState();
        }
    });
    
    // 添加计算器版本信息
    console.log('Win11多功能计算器 v1.0.0');
