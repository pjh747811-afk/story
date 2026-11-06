import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets from stitch_storytour_ai
app.use('/stitch_storytour_ai', express.static(path.join(__dirname, 'stitch_storytour_ai')));

// Screen directory mapping
const SCREEN_ROUTES = {
  // Consumer Views
  'home': '_1',
  'explore': '_2',
  'ai-cam': 'ai_2',
  'ai-cam-night': 'ai_5',
  'ai-cam-detail': '_6',
  'ai-cam-alt': '_7',
  'ai-docent-chat': 'ai_3',
  'ai-docent-chat-thread': 'ai_4',
  'my-archive': '_3',
  'stamp-palaces': '_3',
  'stamp-trail': '_4',
  'cert-palaces': '5',
  'cert-trail': '_5',
  'cert-mobile-1': '9_16_1',
  'cert-mobile-2': '9_16_2',
  'cert-mobile-3': '9_16_3',
  'story-geunjeongjeon': 'ai_1',
  'membership': 'saas',

  // B2B Views
  'b2b-dashboard': 'b2b_1',
  'b2b-consult': 'b2b_2',
  'b2b-report': 'b2b_3',
  'b2b-dataset': 'b2b_4',
  'b2b-csv': 'b2b_csv',
  'b2b-cms': 'b2b_5',
  'b2b-cms-edit': 'b2b_6',
  'b2b-beacon-sim': 'b2b_7',
  'b2b-beacons': 'b2b_qr',
  'b2b-heatmap': '_8'
};

// All available screens with labels for quick navigator
const SCREEN_CATALOG = [
  { group: 'B2C 관람객 모드', items: [
    { id: '_1', path: '/', label: '홈 (AI Docent Live & 추천 유산)', icon: 'home' },
    { id: '_2', path: '/explore', label: '탐색 (문화유산 지도 & 도보 코스)', icon: 'explore' },
    { id: 'ai_1', path: '/story/geunjeongjeon', label: '상세 해설 (경복궁 근정전 스토리)', icon: 'auto_stories' },
    { id: 'ai_2', path: '/ai-cam', label: 'AI 카메라 (현장 AR HUD 스캔)', icon: 'photo_camera' },
    { id: 'ai_5', path: '/ai-cam/night', label: 'AI 카메라 (야간 관람 모드)', icon: 'nightlight' },
    { id: '_6', path: '/ai-cam/detail', label: 'AI 카메라 (건축 디테일 심층 분석)', icon: 'visibility' },
    { id: 'ai_3', path: '/ai-docent-chat', label: 'AI 도슨트 대화 (실시간 역사 질의응답)', icon: 'chat' },
    { id: 'ai_4', path: '/ai-docent-chat/history', label: 'AI 도슨트 대화 (이어지는 대화 세션)', icon: 'forum' },
    { id: '_3', path: '/my-archive', label: '스탬프 투어 (어보 테마 디지털 스탬프)', icon: 'verified' },
    { id: '_4', path: '/stamp/trail', label: '스탬프 투어 (한양도성 18.6km 완주)', icon: 'tour' },
    { id: '5', path: '/cert/palaces', label: '완주 인증서 (조선 5대 궁궐 마스터)', icon: 'workspace_premium' },
    { id: '_5', path: '/cert/trail', label: '완주 인증서 (한양도성 순성 마스터)', icon: 'military_tech' },
    { id: '9_16_1', path: '/screen/9_16_1', label: '완주 인증서 (모바일 9:16 포맷 1)', icon: 'stay_current_portrait' },
    { id: 'saas', path: '/membership', label: '멤버십 & 플랜 (개인/단체/기관 요금제)', icon: 'loyalty' }
  ]},
  { group: 'B2B 스마트 문화관광 관제실', items: [
    { id: 'b2b_1', path: '/b2b', label: '관제 대시보드 (실시간 청취 & 밀집도 트렌드)', icon: 'dashboard' },
    { id: '_8', path: '/b2b/heatmap', label: '전시관 밀집 히트맵 관제실 (실시간 혼잡도)', icon: 'local_fire_department' },
    { id: 'b2b_5', path: '/b2b/cms', label: '상설전시 도슨트 CMS (소장품 목록 & DB)', icon: 'inventory_2' },
    { id: 'b2b_6', path: '/b2b/cms/edit', label: '도슨트 스크립트 에디터 (다국어/레벨별)', icon: 'edit_note' },
    { id: 'b2b_qr', path: '/b2b/beacons', label: 'QR & BLE 비콘 센서 인프라 관리', icon: 'qr_code' },
    { id: 'b2b_7', path: '/b2b/beacon-test', label: 'IoT 비콘 전파 간섭 시뮬레이션', icon: 'sensors' },
    { id: 'b2b_4', path: '/b2b/dataset', label: '소장품 청취 원본 데이터셋 & CSV', icon: 'table_view' },
    { id: 'b2b_3', path: '/b2b/report', label: '스마트 문화관광 성과 분석 보고서', icon: 'analytics' },
    { id: 'b2b_2', path: '/b2b/consult', label: '기관 맞춤 상담 신청 (지자체/박물관)', icon: 'support_agent' }
  ]}
];

// Injected Interactive Suite to power links, Audio docent TTS, AI camera simulation, and chat
const INJECTED_NAV_SCRIPT = `
<!-- StoryTour AI Unified Interactive Engine -->
<div id="storytour-hub" class="fixed top-0 left-0 right-0 z-[9999] pointer-events-auto font-sans" style="font-family: 'Manrope', -apple-system, sans-serif;">
  <div class="bg-[#0F1B29] text-[#FAF8F5] border-b border-[#D4AF37]/30 px-3 py-1.5 flex items-center justify-between shadow-lg text-xs backdrop-blur-md bg-opacity-95">
    <div class="flex items-center gap-2">
      <div class="flex items-center gap-1.5 font-semibold text-[#D4AF37]">
        <span class="material-symbols-outlined text-[16px]">account_balance</span>
        <span class="tracking-wide">StoryTour AI</span>
      </div>
      <span class="text-white/30 hidden sm:inline">|</span>
      <span class="text-white/80 hidden md:inline">문화유산 AI 도슨트 통합 뷰어</span>
    </div>

    <!-- Quick Switcher Buttons -->
    <div class="flex items-center gap-1">
      <a href="/" class="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-[#FAF8F5] transition-all flex items-center gap-1">
        <span class="material-symbols-outlined text-[14px]">home</span>
        <span>홈</span>
      </a>
      <a href="/explore" class="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-[#FAF8F5] transition-all flex items-center gap-1">
        <span class="material-symbols-outlined text-[14px]">explore</span>
        <span>탐색</span>
      </a>
      <a href="/story/geunjeongjeon" class="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-[#FAF8F5] transition-all hidden sm:flex items-center gap-1">
        <span class="material-symbols-outlined text-[14px]">auto_stories</span>
        <span>상세스토리</span>
      </a>
      <a href="/ai-cam" class="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-[#FAF8F5] transition-all flex items-center gap-1">
        <span class="material-symbols-outlined text-[14px]">photo_camera</span>
        <span>AI카메라</span>
      </a>
      <a href="/ai-docent-chat" class="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-[#FAF8F5] transition-all flex items-center gap-1">
        <span class="material-symbols-outlined text-[14px]">chat</span>
        <span>AI대화</span>
      </a>
      <a href="/my-archive" class="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-[#FAF8F5] transition-all hidden sm:flex items-center gap-1">
        <span class="material-symbols-outlined text-[14px]">verified</span>
        <span>스탬프/완주증</span>
      </a>
      <a href="/b2b" class="px-2.5 py-1 rounded bg-[#D4AF37] hover:bg-[#c49e29] text-[#0F1B29] font-semibold transition-all flex items-center gap-1 shadow-sm">
        <span class="material-symbols-outlined text-[14px]">dashboard</span>
        <span>B2B 관제실</span>
      </a>

      <!-- Dropdown for All 27 Screens -->
      <button id="toggle-catalog-btn" onclick="toggleCatalogDrawer()" class="ml-1 px-2 py-1 rounded bg-white/15 hover:bg-white/25 text-[#D4AF37] flex items-center gap-0.5" title="모든 화면 바로가기">
        <span class="material-symbols-outlined text-[16px]">menu_open</span>
        <span class="hidden lg:inline text-[11px]">화면 전환</span>
      </button>
    </div>
  </div>

  <!-- Screen Catalog Drawer (Hidden by default) -->
  <div id="catalog-drawer" class="hidden max-h-[80vh] overflow-y-auto bg-[#0A1118]/95 backdrop-blur-xl border-b border-[#D4AF37]/40 shadow-2xl p-4 text-[#FAF8F5]">
    <div class="max-w-6xl mx-auto">
      <div class="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
        <div>
          <h3 class="text-base font-bold text-[#D4AF37] flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[20px]">hub</span>
            StoryTour AI 프로토타입 전체 화면 (27개)
          </h3>
          <p class="text-xs text-white/60 mt-0.5">클릭하면 해당 모드 및 세부 화면으로 즉시 전환됩니다.</p>
        </div>
        <button onclick="toggleCatalogDrawer()" class="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white">
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        <!-- B2C Group -->
        <div class="space-y-1.5">
          <div class="text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1 pb-1">
            <span class="material-symbols-outlined text-[14px]">person</span>
            B2C 모바일 관람객 모드
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            <a href="/" class="p-2 rounded bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 flex items-center gap-2">
              <span class="material-symbols-outlined text-[16px] text-[#D4AF37]">home</span>
              <div><div class="font-semibold text-white">홈 화면</div><div class="text-[10px] text-white/50">_1 / 추천 유산 & 모드</div></div>
            </a>
            <a href="/explore" class="p-2 rounded bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 flex items-center gap-2">
              <span class="material-symbols-outlined text-[16px] text-[#D4AF37]">explore</span>
              <div><div class="font-semibold text-white">문화유산 탐색 지도</div><div class="text-[10px] text-white/50">_2 / 궁궐 유적지 핀 & 코스</div></div>
            </a>
            <a href="/story/geunjeongjeon" class="p-2 rounded bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 flex items-center gap-2">
              <span class="material-symbols-outlined text-[16px] text-[#D4AF37]">auto_stories</span>
              <div><div class="font-semibold text-white">경복궁 근정전 상세 해설</div><div class="text-[10px] text-white/50">ai_1 / 오디오 플레이어</div></div>
            </a>
            <a href="/ai-cam" class="p-2 rounded bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 flex items-center gap-2">
              <span class="material-symbols-outlined text-[16px] text-[#D4AF37]">photo_camera</span>
              <div><div class="font-semibold text-white">AI 카메라 HUD</div><div class="text-[10px] text-white/50">ai_2 / 실시간 AR 인식</div></div>
            </a>
            <a href="/ai-cam/night" class="p-2 rounded bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 flex items-center gap-2">
              <span class="material-symbols-outlined text-[16px] text-[#D4AF37]">nightlight</span>
              <div><div class="font-semibold text-white">AI 카메라 야간 관람</div><div class="text-[10px] text-white/50">ai_5 / 달빛 투어 모드</div></div>
            </a>
            <a href="/ai-cam/detail" class="p-2 rounded bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 flex items-center gap-2">
              <span class="material-symbols-outlined text-[16px] text-[#D4AF37]">visibility</span>
              <div><div class="font-semibold text-white">카메라 심층 분석</div><div class="text-[10px] text-white/50">_6 / 박석 & 처마 해설</div></div>
            </a>
            <a href="/ai-docent-chat" class="p-2 rounded bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 flex items-center gap-2">
              <span class="material-symbols-outlined text-[16px] text-[#D4AF37]">chat</span>
              <div><div class="font-semibold text-white">AI 도슨트 실시간 대화</div><div class="text-[10px] text-white/50">ai_3 / 도슨트 민우 QA</div></div>
            </a>
            <a href="/ai-docent-chat/history" class="p-2 rounded bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 flex items-center gap-2">
              <span class="material-symbols-outlined text-[16px] text-[#D4AF37]">forum</span>
              <div><div class="font-semibold text-white">도슨트 대화 세션</div><div class="text-[10px] text-white/50">ai_4 / 심화 대화 이어보기</div></div>
            </a>
            <a href="/my-archive" class="p-2 rounded bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 flex items-center gap-2">
              <span class="material-symbols-outlined text-[16px] text-[#D4AF37]">verified</span>
              <div><div class="font-semibold text-white">어보 테마 스탬프첩</div><div class="text-[10px] text-white/50">_3 / 5대 궁궐 수집 현황</div></div>
            </a>
            <a href="/stamp/trail" class="p-2 rounded bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 flex items-center gap-2">
              <span class="material-symbols-outlined text-[16px] text-[#D4AF37]">tour</span>
              <div><div class="font-semibold text-white">한양도성 18.6km 스탬프</div><div class="text-[10px] text-white/50">_4 / 순성길 완주 챌린지</div></div>
            </a>
            <a href="/cert/palaces" class="p-2 rounded bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 flex items-center gap-2">
              <span class="material-symbols-outlined text-[16px] text-[#D4AF37]">workspace_premium</span>
              <div><div class="font-semibold text-white">궁궐 마스터 완주증</div><div class="text-[10px] text-white/50">5 / 디지털 인증서 & QR</div></div>
            </a>
            <a href="/cert/trail" class="p-2 rounded bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 flex items-center gap-2">
              <span class="material-symbols-outlined text-[16px] text-[#D4AF37]">military_tech</span>
              <div><div class="font-semibold text-white">한양도성 순성 완주증</div><div class="text-[10px] text-white/50">_5 / 순성길 마스터 인증</div></div>
            </a>
            <a href="/screen/9_16_1" class="p-2 rounded bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 flex items-center gap-2">
              <span class="material-symbols-outlined text-[16px] text-[#D4AF37]">stay_current_portrait</span>
              <div><div class="font-semibold text-white">인증서 모바일 (9:16)</div><div class="text-[10px] text-white/50">9_16_1 / SNS 스토리 공유</div></div>
            </a>
            <a href="/membership" class="p-2 rounded bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 flex items-center gap-2">
              <span class="material-symbols-outlined text-[16px] text-[#D4AF37]">loyalty</span>
              <div><div class="font-semibold text-white">멤버십 & 플랜</div><div class="text-[10px] text-white/50">saas / 스토리텔러 패스</div></div>
            </a>
          </div>
        </div>

        <!-- B2B Group -->
        <div class="space-y-1.5">
          <div class="text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1 pb-1">
            <span class="material-symbols-outlined text-[14px]">corporate_fare</span>
            B2B 기관·지자체·박물관 관제 솔루션
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            <a href="/b2b" class="p-2 rounded bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 flex items-center gap-2">
              <span class="material-symbols-outlined text-[16px] text-[#D4AF37]">dashboard</span>
              <div><div class="font-semibold text-white">관람객 분석 대시보드</div><div class="text-[10px] text-white/50">b2b_1 / 청취 트렌드 & 지표</div></div>
            </a>
            <a href="/b2b/heatmap" class="p-2 rounded bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 flex items-center gap-2">
              <span class="material-symbols-outlined text-[16px] text-[#D4AF37]">local_fire_department</span>
              <div><div class="font-semibold text-white">실시간 밀집 히트맵</div><div class="text-[10px] text-white/50">_8 / 전시관 관제실 혼잡도</div></div>
            </a>
            <a href="/b2b/cms" class="p-2 rounded bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 flex items-center gap-2">
              <span class="material-symbols-outlined text-[16px] text-[#D4AF37]">inventory_2</span>
              <div><div class="font-semibold text-white">상설전시관 도슨트 CMS</div><div class="text-[10px] text-white/50">b2b_5 / 소장품 DB 관리</div></div>
            </a>
            <a href="/b2b/cms/edit" class="p-2 rounded bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 flex items-center gap-2">
              <span class="material-symbols-outlined text-[16px] text-[#D4AF37]">edit_note</span>
              <div><div class="font-semibold text-white">다국어 스크립트 에디터</div><div class="text-[10px] text-white/50">b2b_6 / 반가사유상 스크립트</div></div>
            </a>
            <a href="/b2b/beacons" class="p-2 rounded bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 flex items-center gap-2">
              <span class="material-symbols-outlined text-[16px] text-[#D4AF37]">qr_code</span>
              <div><div class="font-semibold text-white">QR & BLE 비콘 인프라</div><div class="text-[10px] text-white/50">b2b_qr / 센서 발급 & 배터리</div></div>
            </a>
            <a href="/b2b/beacon-test" class="p-2 rounded bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 flex items-center gap-2">
              <span class="material-symbols-outlined text-[16px] text-[#D4AF37]">sensors</span>
              <div><div class="font-semibold text-white">비콘 신호·간섭 시뮬레이션</div><div class="text-[10px] text-white/50">b2b_7 / 전파 세기 & 반경</div></div>
            </a>
            <a href="/b2b/dataset" class="p-2 rounded bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 flex items-center gap-2">
              <span class="material-symbols-outlined text-[16px] text-[#D4AF37]">table_view</span>
              <div><div class="font-semibold text-white">소장품 청취 원본 데이터</div><div class="text-[10px] text-white/50">b2b_4 & CSV / 데이터 다운로드</div></div>
            </a>
            <a href="/b2b/report" class="p-2 rounded bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 flex items-center gap-2">
              <span class="material-symbols-outlined text-[16px] text-[#D4AF37]">analytics</span>
              <div><div class="font-semibold text-white">문화관광 성과 분석 보고서</div><div class="text-[10px] text-white/50">b2b_3 / 상반기 종합 리포트</div></div>
            </a>
            <a href="/b2b/consult" class="p-2 rounded bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 flex items-center gap-2">
              <span class="material-symbols-outlined text-[16px] text-[#D4AF37]">support_agent</span>
              <div><div class="font-semibold text-white">기관 맞춤 상담 신청</div><div class="text-[10px] text-white/50">b2b_2 / 지자체 도입 컨설팅</div></div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
  function toggleCatalogDrawer() {
    const el = document.getElementById('catalog-drawer');
    if (el) {
      el.classList.toggle('hidden');
    }
  }

  // Intercept data-path and clicks for seamless navigation
  document.addEventListener('DOMContentLoaded', () => {
    // Add top padding adjustment to body so the sticky hub doesn't overlap headers
    const mainEl = document.querySelector('body > header');
    if (mainEl) {
      mainEl.style.marginTop = '34px';
    } else {
      document.body.style.paddingTop = '34px';
    }

    // Map data-path attributes
    const pathMappings = {
      'home': '/',
      'explore': '/explore',
      'ai-cam': '/ai-cam',
      'ai-docent-chat': '/ai-docent-chat',
      'my-archive': '/my-archive',
      'membership': '/membership',
      '멤버십-&-플랜': '/membership',
      'dashboard-overview': '/b2b',
      'audience-analytics': '/b2b',
      'docent-content-cms': '/b2b/cms',
      'qr-and-beacon-manager': '/b2b/beacons',
      'multilingual-engine': '/b2b/cms/edit',
      'enterprise-billing': '/membership',
      'helpdesk': '/b2b/consult'
    };

    document.querySelectorAll('[data-path]').forEach(el => {
      const p = el.getAttribute('data-path');
      if (pathMappings[p]) {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          window.location.href = pathMappings[p];
        });
      }
    });

    // Wire up CTA buttons and links
    document.querySelectorAll('button, a, div[class*="cursor-pointer"]').forEach(el => {
      const text = el.innerText || '';

      if (text.includes('AI 카메라로 바로 해설') || text.includes('스캐너 켜기')) {
        el.onclick = () => window.location.href = '/ai-cam';
      } else if (text.includes('주변 문화유산 24곳') || text.includes('자동 가이드 시작')) {
        el.onclick = () => window.location.href = '/explore';
      } else if (text.includes('경복궁 근정전') && !window.location.pathname.includes('/story/')) {
        el.onclick = () => window.location.href = '/story/geunjeongjeon';
      } else if (text.includes('도전! 한양도성') || text.includes('순성길')) {
        el.onclick = () => window.location.href = '/stamp/trail';
      } else if (text.includes('인증서') && text.includes('보기')) {
        el.onclick = () => window.location.href = '/cert/palaces';
      } else if (text.includes('상담 신청') || text.includes('기관 도입')) {
        el.onclick = () => window.location.href = '/b2b/consult';
      } else if (text.includes('CSV 다운로드') || text.includes('내보내기')) {
        el.onclick = (e) => {
          e.preventDefault();
          window.location.href = '/api/dataset/csv';
        };
      }
    });

    // Interactive Audio Docent Player Simulator with Web Speech Synthesis
    const playButtons = document.querySelectorAll('button:has(.material-symbols-outlined:contains("play_arrow")), button:has(.material-symbols-outlined:contains("pause"))');
    let isPlaying = false;
    let synth = window.speechSynthesis;
    let utterance = null;

    document.querySelectorAll('button').forEach(btn => {
      const icon = btn.querySelector('.material-symbols-outlined');
      if (icon && (icon.textContent.trim() === 'play_arrow' || icon.textContent.trim() === 'pause')) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          isPlaying = !isPlaying;
          if (isPlaying) {
            icon.textContent = 'pause';
            const storyText = "경복궁 근정전. 조선 왕실의 정궁인 경복궁의 중심 건물로서, 나라의 가장 장엄한 국가 의례가 거행되던 국보 제223호입니다. 마당에 깔린 거친 박석은 햇빛의 난반사를 막고 신하들의 발걸음을 경건하게 다잡아줍니다.";
            if (synth) {
              synth.cancel();
              utterance = new SpeechSynthesisUtterance(storyText);
              utterance.lang = 'ko-KR';
              utterance.rate = 1.0;
              utterance.onend = () => {
                isPlaying = false;
                icon.textContent = 'play_arrow';
              };
              synth.speak(utterance);
            }
          } else {
            icon.textContent = 'play_arrow';
            if (synth) synth.cancel();
          }
        });
      }
    });

    // Interactive AI Docent Chat Input (on /ai-docent-chat)
    const chatInput = document.querySelector('input[placeholder*="질문"], input[placeholder*="궁금한"]');
    if (chatInput) {
      chatInput.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter' && chatInput.value.trim()) {
          const userMsg = chatInput.value.trim();
          chatInput.value = '';

          // Find chat timeline container
          const timeline = document.querySelector('.flex.flex-col.px-margin') || chatInput.closest('main') || document.body;

          // Append user bubble
          const userBubble = document.createElement('div');
          userBubble.className = "flex items-end justify-end gap-space-xs self-end max-w-[85%] mt-3 animate-fade-in";
          userBubble.innerHTML = \`
            <div class="flex flex-col items-end gap-1 min-w-0">
              <div class="p-3.5 rounded-xl rounded-tr-none bg-primary-container text-on-primary shadow-sm">
                <p class="font-body-md text-body-md leading-snug">\${escapeHtml(userMsg)}</p>
              </div>
              <span class="font-label-sm text-label-sm text-outline pr-1">방금 전</span>
            </div>
          \`;
          timeline.appendChild(userBubble);
          userBubble.scrollIntoView({ behavior: 'smooth' });

          // Fetch or generate answer
          try {
            const resp = await fetch('/api/chat', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ message: userMsg, topic: '경복궁 근정전' })
            });
            const data = await resp.json();

            // Append docent bubble
            const docentBubble = document.createElement('div');
            docentBubble.className = "flex items-start gap-space-sm max-w-[95%] mt-4 animate-fade-in";
            docentBubble.innerHTML = \`
              <div class="w-8 h-8 rounded-full bg-primary-container text-tertiary-fixed flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                <span class="material-symbols-outlined text-[18px]">record_voice_over</span>
              </div>
              <div class="flex flex-col gap-2 min-w-0 w-full">
                <div class="flex items-center gap-2">
                  <span class="font-label-md text-label-md text-on-surface font-semibold">도슨트 민우</span>
                  <span class="px-1.5 py-0.5 rounded bg-tertiary/10 text-tertiary font-label-sm text-label-sm">실시간 AI</span>
                  <span class="font-label-sm text-label-sm text-outline">방금 전</span>
                </div>
                <div class="p-4 rounded-xl rounded-tl-none bg-surface-container-lowest text-on-surface shadow-sm flex flex-col gap-2 border border-[#E8DEC8]">
                  <p class="font-body-md text-body-md leading-relaxed">\${data.reply}</p>
                </div>
              </div>
            \`;
            timeline.appendChild(docentBubble);
            docentBubble.scrollIntoView({ behavior: 'smooth' });
          } catch (err) {
            console.error('Chat error:', err);
          }
        }
      });
    }

    function escapeHtml(text) {
      const div = document.createElement('div');
      div.innerText = text;
      return div.innerHTML;
    }
  });
</script>
`;

function serveScreenHtml(folderName, res, req) {
  const filePath = path.join(__dirname, 'stitch_storytour_ai', folderName, 'code.html');
  if (!fs.existsSync(filePath)) {
    return res.status(404).send(`Screen ${folderName} not found`);
  }

  let html = fs.readFileSync(filePath, 'utf-8');

  // Fix relative image links or paths if needed
  html = html.replace(/(src|href)=["']\.\.\//g, '$1="/stitch_storytour_ai/');

  // Inject the StoryTour AI interactive hub into the body
  if (html.includes('</body>')) {
    html = html.replace('</body>', `${INJECTED_NAV_SCRIPT}</body>`);
  } else {
    html += INJECTED_NAV_SCRIPT;
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(html);
}

// Routes
// 1. Consumer Core Routes
app.get('/', (req, res) => serveScreenHtml('_1', res, req));
app.get('/explore', (req, res) => serveScreenHtml('_2', res, req));
app.get('/ai-cam', (req, res) => serveScreenHtml('ai_2', res, req));
app.get('/ai-cam/night', (req, res) => serveScreenHtml('ai_5', res, req));
app.get('/ai-cam/detail', (req, res) => serveScreenHtml('_6', res, req));
app.get('/ai-cam/alt', (req, res) => serveScreenHtml('_7', res, req));
app.get('/ai-docent-chat', (req, res) => serveScreenHtml('ai_3', res, req));
app.get('/ai-docent-chat/history', (req, res) => serveScreenHtml('ai_4', res, req));
app.get('/my-archive', (req, res) => serveScreenHtml('_3', res, req));
app.get('/stamp', (req, res) => serveScreenHtml('_3', res, req));
app.get('/stamp/trail', (req, res) => serveScreenHtml('_4', res, req));
app.get('/cert/palaces', (req, res) => serveScreenHtml('5', res, req));
app.get('/cert/trail', (req, res) => serveScreenHtml('_5', res, req));
app.get('/story/geunjeongjeon', (req, res) => serveScreenHtml('ai_1', res, req));
app.get('/membership', (req, res) => serveScreenHtml('saas', res, req));

// 2. B2B Routes
app.get('/b2b', (req, res) => serveScreenHtml('b2b_1', res, req));
app.get('/b2b/dashboard', (req, res) => serveScreenHtml('b2b_1', res, req));
app.get('/b2b/consult', (req, res) => serveScreenHtml('b2b_2', res, req));
app.get('/b2b/report', (req, res) => serveScreenHtml('b2b_3', res, req));
app.get('/b2b/dataset', (req, res) => serveScreenHtml('b2b_4', res, req));
app.get('/b2b/csv', (req, res) => serveScreenHtml('b2b_csv', res, req));
app.get('/b2b/cms', (req, res) => serveScreenHtml('b2b_5', res, req));
app.get('/b2b/cms/edit', (req, res) => serveScreenHtml('b2b_6', res, req));
app.get('/b2b/beacons', (req, res) => serveScreenHtml('b2b_qr', res, req));
app.get('/b2b/beacon-test', (req, res) => serveScreenHtml('b2b_7', res, req));
app.get('/b2b/heatmap', (req, res) => serveScreenHtml('_8', res, req));

// Generic screen viewer
app.get('/screen/:name', (req, res) => {
  const name = req.params.name;
  serveScreenHtml(name, res, req);
});

// Catalog JSON API
app.get('/api/catalog', (req, res) => {
  res.json({ catalog: SCREEN_CATALOG });
});

// CSV Dataset Download Route
app.get('/api/dataset/csv', (req, res) => {
  const csvData = [
    'log_id,timestamp,exhibit_id,exhibit_name,language,duration_sec,completion_rate,trigger_type,device_os',
    'LOG-2025-001,2025-05-18T10:14:22Z,EX-0083,금동미륵보살 반가사유상,ko,214,94%,BLE_BEACON,iOS',
    'LOG-2025-002,2025-05-18T10:15:01Z,EX-0083,금동미륵보살 반가사유상,en,180,82%,QR_SCAN,Android',
    'LOG-2025-003,2025-05-18T10:16:35Z,EX-0012,경복궁 근정전,ko,312,100%,GPS_GEOFENCE,iOS',
    'LOG-2025-004,2025-05-18T10:18:10Z,EX-0012,경복궁 근정전,ja,245,88%,AI_CAMERA,iOS',
    'LOG-2025-005,2025-05-18T10:21:40Z,EX-0045,백제 금동대향로,ko,290,96%,BLE_BEACON,Android',
    'LOG-2025-006,2025-05-18T10:25:12Z,EX-0021,창덕궁 후원 부용정,ko,340,91%,GPS_GEOFENCE,iOS',
    'LOG-2025-007,2025-05-18T10:28:44Z,EX-0083,금동미륵보살 반가사유상,zh,195,79%,QR_SCAN,Android'
  ].join('\n');

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="storytour_heritage_listening_logs.csv"');
  res.send('\uFEFF' + csvData); // UTF-8 BOM for Excel compatibility
});

// Interactive AI Docent API
app.post('/api/chat', (req, res) => {
  const { message, topic } = req.body || {};
  const query = (message || '').toLowerCase();

  let reply = "좋은 질문입니다! 경복궁 근정전은 조선 태조 4년(1395)에 건립되어 역대 왕들의 즉위식과 외국 사신 맞이 등 가장 중요한 국가 의전이 이루어진 국보입니다.";

  if (query.includes('박석') || query.includes('돌') || query.includes('울퉁불퉁')) {
    reply = "근정전 앞마당에 깔린 거친 화강암 '박석(薄石)'에는 선조들의 놀라운 과학과 미학이 담겨 있습니다. 첫째, 표면이 거칠어 강한 햇빛이 반사되어 왕이나 신하들의 눈이 부시는 현상을 막아주었습니다. 둘째, 가죽신을 신은 신하들이 비나 눈이 올 때 미끄러지지 않도록 예방했고, 셋째, 빗물이 자연스럽게 틈새를 타고 빠져나가 물고임을 방지했습니다.";
  } else if (query.includes('잡상') || query.includes('기와') || query.includes('어처구니')) {
    reply = "근정전 지붕 처마 끝에 줄지어 앉아 있는 조각들을 '잡상(雜像)'이라고 부릅니다. 서유기에 등장하는 대당사부(삼장법사), 손오공, 사오정, 저팔계 등의 형상을 본뜬 것으로, 궁궐에 깃들 수 있는 화재와 잡귀, 액운을 막아내는 벽사(辟邪)의 의미를 지닙니다. 근정전에는 지붕 마루마다 7~9개의 잡상이 위엄 있게 배치되어 있습니다.";
  } else if (query.includes('일월오봉도') || query.includes('그림') || query.includes('왕좌')) {
    reply = "어좌(御座) 뒤편 병풍에 그려진 '일월오봉도(日月五峯圖)'는 해와 달, 다섯 개의 산봉우리, 소나무, 굽이치는 파도를 그린 조선 왕실의 상징화입니다. 해는 왕, 달은 왕비를 상징하며 다섯 봉우리는 백두산·묘향산·금강산·지리산·삼각산 등 국토의 명산을 뜻합니다. 오직 살아 숨 쉬는 국왕이 그 앞에 앉아 있을 때 비로소 그림이 완성된다는 깊은 철학적 의미가 있습니다.";
  } else if (query.includes('월대') || query.includes('서수') || query.includes('동물')) {
    reply = "근정전은 2층으로 쌓은 화강암 기단인 '월대(月臺)' 위에 우뚝 서 있습니다. 월대 난간 기둥 모퉁이에는 사신(청룡·백호·주작·현무)과 십이지신을 조각한 서수(瑞獸, 상서로운 동물)들이 궁궐을 사방에서 호위하고 있습니다. 자세히 보시면 무섭기보다는 미소를 머금은 해학적인 표정을 짓고 있어 조선 특유의 친근한 예술미를 엿볼 수 있습니다.";
  } else if (query.includes('시간') || query.includes('야간') || query.includes('관람')) {
    reply = "경복궁 정규 관람 시간은 보통 오전 9시부터 오후 5시~6시 30분(계절별 상이)까지이며 매주 화요일은 정기 휴궁일입니다. 봄과 가을에 진행되는 '경복궁 야간 특별 관람'에서는 은은한 조명 아래 달빛을 머금은 근정전의 환상적인 야경을 감상하실 수 있습니다.";
  }

  res.json({ reply });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`StoryTour AI server listening on http://0.0.0.0:${PORT}`);
});
