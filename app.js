const types = [
  'Microfine Cement',
  'Oil Well Cement',
  'TPI Portland Cement Type I (Red)',
];
const sampleNames = ['ตัวอย่างที่ 1', 'ตัวอย่างที่ 2', 'ตัวอย่างที่ 3'];
const today = new Date();
const todayISO = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
const number = (value) => {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
};
const format = (value, digits = 2) => value.toLocaleString('th-TH', { minimumFractionDigits: digits, maximumFractionDigits: digits });
const getInput = (field, index) => document.querySelector(`[data-field="${field}"][data-index="${index}"]`);
const readValue = (field, index) => getInput(field, index).value;

function sampleCard(index) {
  return `<section class="sample-card" aria-labelledby="sample-title-${index}">
    <div class="sample-heading"><div class="sample-index">0${index + 1}</div><h2 id="sample-title-${index}">${sampleNames[index]}</h2><span class="sample-unit">MPa</span></div>
    <div class="sample-inputs">
      <label>น้ำหนัก<span class="input-wrap"><input type="number" min="0" step="any" inputmode="decimal" placeholder="0.00" data-field="weight" data-index="${index}" aria-label="น้ำหนัก ${sampleNames[index]}"><span>kg</span></span></label>
      <label>กว้าง<span class="input-wrap"><input type="number" min="0" step="any" inputmode="decimal" placeholder="0.00" data-field="width" data-index="${index}" aria-label="ความกว้าง ${sampleNames[index]}"><span>mm</span></span></label>
      <label>ยาว<span class="input-wrap"><input type="number" min="0" step="any" inputmode="decimal" placeholder="0.00" data-field="length" data-index="${index}" aria-label="ความยาว ${sampleNames[index]}"><span>mm</span></span></label>
      <label>ผลจากเครื่องทดสอบ<span class="input-wrap"><input type="number" min="0" step="any" inputmode="decimal" placeholder="0.00" data-field="machine" data-index="${index}" aria-label="ผลจากเครื่องทดสอบ ${sampleNames[index]}"><span>kN</span></span></label>
    </div>
    <div class="sample-results"><div><span>พื้นที่หน้าตัด</span><strong><b data-result="area" data-index="${index}">—</b><small>mm²</small></strong></div><div><span>แรงกดปรับแก้แล้ว</span><strong><b data-result="corrected" data-index="${index}">—</b><small>kN</small></strong></div><div class="strength-result"><span>กำลังอัด</span><strong><b data-result="strength" data-index="${index}">—</b><small>MPa</small></strong></div></div>
  </section>`;
}

function render() {
  document.getElementById('app').innerHTML = `<main class="page-shell">
    <header class="topbar"><a class="brand" href="#" aria-label="หน้าแรก"><span class="brand-mark"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19V5h5.2l2.8 4 2.8-4H20v14h-4V11l-4 5-4-5v8H4Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg></span><span class="brand-name">MATERIALS LAB<span>TESTING WORKSHEET</span></span></a><div class="top-note"><span class="live-dot"></span>เครื่องมือคำนวณผลทดสอบ</div></header>
    <section class="intro"><div class="eyebrow"><span>LABORATORY</span><i></i><span>CONCRETE & CEMENT</span></div><h1>Compressive strength <em>Test</em></h1><p>บันทึกข้อมูลตัวอย่างและคำนวณค่ากำลังอัดโดยอัตโนมัติ</p></section>
    <section class="test-info"><label class="select-field"><span class="field-label"><span class="field-number">01</span>ชนิดปูน</span><span class="select-wrap"><select id="cement-type" aria-label="เลือกชนิดปูน">${types.map((type) => `<option>${type}</option>`).join('')}</select><span class="select-arrow">⌄</span></span></label><label class="date-field"><span class="field-label"><span class="field-number">02</span>วันที่เก็บตัวอย่าง</span><span class="date-wrap"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5" width="17" height="16" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M7.5 3v4M16.5 3v4M4 9.5h16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg><input id="sample-date" type="date" value="${todayISO}" aria-label="วันที่เก็บตัวอย่าง"></span></label><label class="age-field"><span class="field-label"><span class="field-number">03</span>อายุลูกปูน</span><span class="input-wrap"><input id="cement-age" type="number" min="0" step="1" inputmode="numeric" placeholder="เช่น 7" aria-label="อายุลูกปูน"><span>วัน</span></span></label><label class="shift-field"><span class="field-label"><span class="field-number">04</span>กะการทดสอบ</span><span class="select-wrap"><select id="shift-type" aria-label="เลือกกะการทดสอบ"><option>Day Shift</option><option>Night Shift</option></select><span class="select-arrow">⌄</span></span></label></section>
    <div class="section-heading"><div><span class="eyebrow">TEST SPECIMENS</span><h2>ข้อมูลตัวอย่าง</h2></div><span class="specimen-count">03 <span>SPECIMENS</span></span></div>
    <section class="samples" aria-label="ข้อมูลตัวอย่างสามลูก">${sampleNames.map((_, index) => sampleCard(index)).join('')}</section>
    <section class="summary"><div class="summary-copy"><span class="summary-kicker">AVERAGE STRENGTH</span><h2>ค่าเฉลี่ยกำลังอัด</h2><p>คำนวณจากตัวอย่างที่มีข้อมูลครบ</p></div><div class="average"><span data-result="average">—</span><small>MPa</small></div></section>
    <footer class="formula"><div class="formula-label"><span class="formula-icon">ƒx</span><div><strong>สูตรคำนวณ</strong><small>FORMULA REFERENCE</small></div></div><div class="formula-equations"><p><span>พื้นที่หน้าตัด</span><code>กว้าง × ยาว</code></p><p><span>แรงกดปรับแก้แล้ว</span><code>(ผลจากเครื่องทดสอบ × 0.998) + 2.782</code></p><p><span>กำลังอัด</span><code>(แรงกดปรับแก้แล้ว × 1,000) ÷ พื้นที่หน้าตัด</code></p><p><span>ค่าเฉลี่ย</span><code>ผลรวมกำลังอัด ÷ จำนวนตัวอย่างที่กรอกครบ</code></p></div></footer>
    <section class="report" aria-labelledby="report-title"><div class="report-heading"><div><span class="eyebrow">TEST REPORT</span><h2 id="report-title">สรุปผลการทดสอบ</h2></div><button class="copy-button" id="copy-report" type="button"><span aria-hidden="true">▢</span> คัดลอกรายงาน</button></div><div class="report-meta"><div><span>ชนิดปูน</span><strong data-report="cement">Microfine Cement</strong></div><div><span>วันที่เก็บตัวอย่าง</span><strong data-report="date">—</strong></div><div><span>อายุลูกปูน</span><strong><b data-report="age">—</b> วัน</strong></div><div><span>กะการทดสอบ</span><strong data-report="shift">Day Shift</strong></div></div><div class="table-wrap"><table class="report-table"><thead><tr><th>ตัวอย่าง</th><th>น้ำหนัก<br>(kg)</th><th>กว้าง<br>(mm)</th><th>ยาว<br>(mm)</th><th>ผลทดสอบ<br>(kN)</th><th>ปรับแก้แล้ว<br>(kN)</th><th>กำลังอัด<br>(MPa)</th></tr></thead><tbody>${sampleNames.map((name, index) => `<tr><th>${name}</th><td data-report="weight-${index}">—</td><td data-report="width-${index}">—</td><td data-report="length-${index}">—</td><td data-report="machine-${index}">—</td><td data-report="corrected-${index}">—</td><td data-report="strength-${index}">—</td></tr>`).join('')}<tr class="avg-row"><th colspan="6">ค่าเฉลี่ยกำลังอัด · AVG</th><td><strong data-report="average">—</strong><small>MPa</small></td></tr></tbody></table></div></section>
    <div class="page-foot"><span>Materials testing worksheet</span><span>COMPRESSIVE STRENGTH · MPa</span></div>
  </main>`;

  const reportCell = (name) => document.querySelector(`[data-report="${name}"]`);
  const update = () => {
    const strengths = [];
    document.querySelectorAll('[data-report]').forEach((cell) => { if (!['cement', 'date', 'shift'].includes(cell.dataset.report)) cell.textContent = '—'; });
    document.querySelectorAll('[data-result="area"], [data-result="corrected"], [data-result="strength"]').forEach((el) => { el.textContent = '—'; });
    sampleNames.forEach((_, index) => {
      const weightRaw = readValue('weight', index);
      const widthRaw = readValue('width', index);
      const lengthRaw = readValue('length', index);
      const machineRaw = readValue('machine', index);
      const weight = number(weightRaw);
      const width = number(widthRaw);
      const length = number(lengthRaw);
      const machine = number(machineRaw);
      const area = width * length;
      const hasMachine = machineRaw !== '';
      const corrected = machine * 0.998 + 2.782;
      const areaEl = document.querySelector(`[data-result="area"][data-index="${index}"]`);
      const correctedEl = document.querySelector(`[data-result="corrected"][data-index="${index}"]`);
      const strengthEl = document.querySelector(`[data-result="strength"][data-index="${index}"]`);
      if (widthRaw !== '' && lengthRaw !== '') areaEl.textContent = format(area, 2);
      if (hasMachine) correctedEl.textContent = format(corrected, 3);
      let strength = null;
      if (area > 0 && hasMachine) {
        strength = (corrected * 1000) / area;
        strengthEl.textContent = format(strength, 2);
        strengths.push(strength);
      }
      const reportValues = {
        [`weight-${index}`]: weightRaw === '' ? '—' : format(weight),
        [`width-${index}`]: widthRaw === '' ? '—' : format(width),
        [`length-${index}`]: lengthRaw === '' ? '—' : format(length),
        [`machine-${index}`]: machineRaw === '' ? '—' : format(machine),
        [`corrected-${index}`]: hasMachine ? format(corrected, 3) : '—',
        [`strength-${index}`]: strength === null ? '—' : format(strength),
      };
      Object.entries(reportValues).forEach(([key, value]) => { reportCell(key).textContent = value; });
    });
    const average = strengths.length ? strengths.reduce((sum, value) => sum + value, 0) / strengths.length : null;
    document.querySelector('[data-result="average"]').textContent = average === null ? '—' : format(average);
    reportCell('average').textContent = average === null ? '—' : format(average);
    reportCell('cement').textContent = document.getElementById('cement-type').value;
    const date = document.getElementById('sample-date').value;
    if (date) {
      const [year, month, day] = date.split('-').map(Number);
      reportCell('date').textContent = `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year + 543}`;
    } else {
      reportCell('date').textContent = '—';
    }
    reportCell('shift').textContent = document.getElementById('shift-type').value;
    const age = document.getElementById('cement-age').value;
    reportCell('age').textContent = age === '' ? '—' : format(number(age), 0);
  };
  document.getElementById('copy-report').addEventListener('click', async (event) => {
    const dateText = reportCell('date').textContent;
    const reportLines = [
      '📋 รายงานผลทดสอบกำลังอัดปูน (Compressive Strength Test)',
      `ชนิดปูน: ${reportCell('cement').textContent}`,
      `วันที่เก็บตัวอย่าง: ${dateText}`,
      `กะการทดสอบ: ${reportCell('shift').textContent}`,
      `อายุลูกปูน: ${reportCell('age').textContent} วัน`,
      '',
    ];
    sampleNames.forEach((name, index) => {
      reportLines.push(
        `${name}`,
        `น้ำหนัก: ${reportCell(`weight-${index}`).textContent} kg`,
        `ขนาดหน้าตัด: ${reportCell(`width-${index}`).textContent} × ${reportCell(`length-${index}`).textContent} mm`,
        `ผลจากเครื่องทดสอบ: ${reportCell(`machine-${index}`).textContent} kN`,
        `แรงกดปรับแก้แล้ว: ${reportCell(`corrected-${index}`).textContent} kN`,
        `กำลังอัด: ${reportCell(`strength-${index}`).textContent} MPa`,
        '',
      );
    });
    reportLines.push(`ค่าเฉลี่ยกำลังอัด (AVG): ${reportCell('average').textContent} MPa`);
    const text = reportLines.join('\n');
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
    }
    const button = event.currentTarget;
    button.innerHTML = '<span aria-hidden="true">✓</span> คัดลอกแล้ว';
    button.classList.add('copied');
    window.setTimeout(() => {
      button.innerHTML = '<span aria-hidden="true">▢</span> คัดลอกรายงาน';
      button.classList.remove('copied');
    }, 1800);
  });
  document.querySelectorAll('.sample-inputs input').forEach((input) => input.addEventListener('input', update));
  document.getElementById('cement-type').addEventListener('change', update);
  document.getElementById('sample-date').addEventListener('input', update);
  document.getElementById('shift-type').addEventListener('change', update);
  document.getElementById('cement-age').addEventListener('input', update);
  update();
}

render();




