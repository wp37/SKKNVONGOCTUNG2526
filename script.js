/* ============================
   EZTOOL4teach SKKN — Script
   Charts (Dark Theme), Animations, Navigation
   ============================ */

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initTopbar();
  initSidebar();
  initTOCHighlight();
  initCharts();
});

/* ── Scroll Animations ───────────────────────── */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

/* ── Topbar scroll effect ───────────────────────── */
function initTopbar() {
  const topbar = document.getElementById('topbar');
  window.addEventListener('scroll', () => {
    topbar.classList.toggle('scrolled', window.scrollY > 10);
  });
}

/* ── Sidebar toggle (mobile) ───────────────────── */
function initSidebar() {
  const toggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  }

  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
  });

  overlay.addEventListener('click', closeSidebar);

  sidebar.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth <= 1024) closeSidebar();
    });
  });
}

/* ── TOC active highlight ───────────────────────── */
function initTOCHighlight() {
  const tocLinks = document.querySelectorAll('.toc-list a');
  const navLinks = document.querySelectorAll('.topbar-nav a');
  const sections = [];

  tocLinks.forEach(link => {
    const id = link.getAttribute('href').replace('#', '');
    const section = document.getElementById(id);
    if (section) sections.push({ id, el: section });
  });

  function updateActive() {
    const scrollY = window.scrollY + 100;
    let current = sections[0]?.id;

    sections.forEach(s => {
      if (scrollY >= s.el.offsetTop) current = s.id;
    });

    tocLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });

    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', updateActive);
  updateActive();
}

/* ── Charts (Dark Theme) ───────────────────────── */
function initCharts() {
  const gold = '#D4A843';
  const goldLight = '#E8C468';
  const blue = '#42A5F5';
  const blueDark = '#1565C0';
  const teal = '#26A69A';
  const red = '#EF5350';
  const gray = '#5C5C5C';
  const textColor = '#9B9A97';
  const gridColor = 'rgba(255,255,255,0.04)';

  const fontFamily = "'Inter', 'Be Vietnam Pro', sans-serif";

  Chart.defaults.font.family = fontFamily;
  Chart.defaults.font.size = 12;
  Chart.defaults.color = textColor;
  Chart.defaults.plugins.legend.labels.usePointStyle = true;
  Chart.defaults.plugins.legend.labels.padding = 14;
  Chart.defaults.plugins.legend.labels.color = textColor;

  // ── Chart: Mức độ hứng thú HS ──
  const ctxInterest = document.getElementById('chart-interest');
  if (ctxInterest) {
    new Chart(ctxInterest, {
      type: 'doughnut',
      data: {
        labels: ['Rất hứng thú (45.7%)', 'Hứng thú (32.1%)', 'Ít hứng thú (15.6%)', 'Không hứng thú (6.6%)'],
        datasets: [{
          data: [45.7, 32.1, 15.6, 6.6],
          backgroundColor: [gold, blue, teal, gray],
          borderWidth: 2,
          borderColor: '#16161e',
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { font: { size: 11 } } }
        },
        cutout: '58%'
      }
    });
  }

  // ── Chart: Thời gian soạn đề ──
  const ctxTime = document.getElementById('chart-time');
  if (ctxTime) {
    new Chart(ctxTime, {
      type: 'bar',
      data: {
        labels: ['Đề KT 15 phút', 'Đề KT 1 tiết', 'Đề KT học kỳ'],
        datasets: [
          {
            label: 'Thủ công (trước)',
            data: [90, 150, 240],
            backgroundColor: red + '25',
            borderColor: red,
            borderWidth: 1.5,
            borderRadius: 6,
            barPercentage: 0.55
          },
          {
            label: 'EZTOOL4teach (sau)',
            data: [8, 15, 30],
            backgroundColor: teal + '25',
            borderColor: teal,
            borderWidth: 1.5,
            borderRadius: 6,
            barPercentage: 0.55
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Phút', font: { weight: 600 }, color: textColor },
            grid: { color: gridColor },
            ticks: { color: textColor }
          },
          x: { grid: { display: false }, ticks: { color: textColor } }
        }
      }
    });
  }

  // ── Chart: Trước khi áp dụng (Doughnut) ──
  const ctxBefore = document.getElementById('chart-before');
  if (ctxBefore) {
    new Chart(ctxBefore, {
      type: 'doughnut',
      data: {
        labels: ['Giỏi (15.3%)', 'Khá (32.5%)', 'TB (45.3%)', 'Yếu (6.9%)'],
        datasets: [{
          data: [15.3, 32.5, 45.3, 6.9],
          backgroundColor: [gold, blue, teal, red],
          borderWidth: 2,
          borderColor: '#16161e',
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom', labels: { font: { size: 10 } } } },
        cutout: '58%'
      }
    });
  }

  // ── Chart: Sau khi áp dụng (Doughnut) ──
  const ctxAfter = document.getElementById('chart-after');
  if (ctxAfter) {
    new Chart(ctxAfter, {
      type: 'doughnut',
      data: {
        labels: ['Giỏi (38.7%)', 'Khá (45.2%)', 'TB (15.1%)', 'Yếu (1.0%)'],
        datasets: [{
          data: [38.7, 45.2, 15.1, 1.0],
          backgroundColor: [gold, blue, teal, red],
          borderWidth: 2,
          borderColor: '#16161e',
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom', labels: { font: { size: 10 } } } },
        cutout: '58%'
      }
    });
  }

  // ── Chart: So sánh tổng thể (Bar) ──
  const ctxCompare = document.getElementById('chart-compare');
  if (ctxCompare) {
    new Chart(ctxCompare, {
      type: 'bar',
      data: {
        labels: ['Giỏi', 'Khá', 'Trung bình', 'Yếu'],
        datasets: [
          {
            label: '2023–2024 (Trước)',
            data: [15.3, 32.5, 45.3, 6.9],
            backgroundColor: red + '20',
            borderColor: red,
            borderWidth: 1.5,
            borderRadius: 6,
            barPercentage: 0.6
          },
          {
            label: '2024–2025 (Sau)',
            data: [38.7, 45.2, 15.1, 1.0],
            backgroundColor: gold + '30',
            borderColor: gold,
            borderWidth: 1.5,
            borderRadius: 6,
            barPercentage: 0.6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' },
          tooltip: {
            callbacks: {
              label: ctx => ctx.dataset.label + ': ' + ctx.parsed.y + '%'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 50,
            title: { display: true, text: 'Tỷ lệ (%)', font: { weight: 600 }, color: textColor },
            grid: { color: gridColor },
            ticks: { callback: v => v + '%', color: textColor }
          },
          x: { grid: { display: false }, ticks: { color: textColor } }
        }
      }
    });
  }
}
