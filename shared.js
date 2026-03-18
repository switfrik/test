/* shared.js — 공통 유틸리티 */

/* ── 페이지 전환 ── */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById('page-' + id);
  if (page) page.classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => {
    n.classList.toggle('active', n.dataset.page === id);
  });
  const labels = {
    dashboard:'대시보드', 'doc-list':'설계서 목록',
    'doc-register':'설계서 등록', 'doc-detail':'설계서 상세',
    'expert-manage':'자문위원 관리', 'expert-dashboard':'배정 현황',
    'expert-write':'의견 작성', scope:'과업 범위'
  };
  const bc = document.getElementById('breadcrumb');
  if (bc) bc.innerHTML = `홈 / <span>${labels[id] || id}</span>`;
}

/* ── 탭 ── */
function switchTab(el, tabId) {
  const parent = el.closest('.tab-bar').parentElement;
  parent.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  parent.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  const tc = parent.querySelector('#' + tabId);
  if (tc) tc.classList.add('active');
}

/* ── Accordion ── */
function toggleAccordion(header) {
  const body = header.nextElementSibling;
  header.classList.toggle('open');
  if (body) body.classList.toggle('open');
}

/* ── Modal ── */
function openModal(id)  { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) e.target.classList.remove('open');
});

/* ── 필터 칩 ── */
function toggleFilter(el) {
  el.closest('.filter-row').querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
}

/* ── 배지 HTML ── */
function stageBadge(s) {
  const map = { s1:'stage-s1', s2:'stage-s2', s3:'stage-s3', s4:'stage-s4' };
  const lbl = { s1:'S1', s2:'S2', s3:'S3', s4:'S4' };
  return `<span class="stage-badge ${map[s] || ''}">${lbl[s] || s}</span>`;
}
function typeBadge(t) {
  const map = { ivd:'IVD', diag:'진단', treat:'치료' };
  return `<span class="type-${t}">${map[t] || t}</span>`;
}
function statusDot(st) {
  const map = { '자문검토중':'amber','진행중':'green','최종확정':'green','재요청발행':'red','S1작성중':'blue','대기':'gray' };
  return `<span class="dot-status dot-${map[st]||'gray'}"></span>${st}`;
}

/* ── Expert 검색 필터 ── */
function filterExperts(experts, query, fieldFilter) {
  return experts.filter(e => {
    const q = query.toLowerCase();
    const match = !q || e.society.toLowerCase().includes(q)
      || e.affiliation.toLowerCase().includes(q)
      || e.department.toLowerCase().includes(q)
      || e.specialty.toLowerCase().includes(q)
      || e.title.toLowerCase().includes(q);
    const fieldMatch = !fieldFilter || fieldFilter === '전체' || e.fields.includes(fieldFilter);
    return match && fieldMatch;
  });
}
