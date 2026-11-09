'use client';

import { useState } from "react";
// data/courses.js 파일에서 강좌 목록 데이터를 불러옴
import { courses } from "@/data/courses";

interface Course {
  id: number;
  name: string;
  price: number;
  seat: number;
  booked: number;
  date: string;
  tags: string[];
}

export default function Home() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  // 요구사항: "예약 가능한 강좌만 보기" 체크박스 상태
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(false);

  // 체크 시 남은 좌석(seat - booked)이 1석 이상인 강좌만 필터링, 체크 해제 시 전체 강좌
  const displayedCourses = onlyAvailable
    ? courses.filter((course) => course.seat - course.booked > 0)
    : courses;

  const handleBooking = (course: Course) => {
    const remaining = course.seat - course.booked;
    if (remaining === 0) return;

    setSelectedCourse(course);
    setToastMessage(course.name + " (" + course.price.toLocaleString() + "원) 예약 신청 창이 열렸습니다.");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const getCourseIcon = (name: string) => {
    if (name.includes("AI") || name.includes("자동화")) return "🤖";
    if (name.includes("숏폼") || name.includes("영상") || name.includes("편집")) return "🎬";
    if (name.includes("엑셀") || name.includes("실무")) return "📊";
    if (name.includes("스마트스토어") || name.includes("스토어")) return "🛍️";
    if (name.includes("블로그") || name.includes("수익화") || name.includes("글쓰기")) return "✍️";
    return "💡";
  };

  return (
    <div className="min-h-screen bg-[#070d1e] text-[#e4e9f5] flex flex-col justify-between selection:bg-[#f5d061] selection:text-[#070d1e] relative overflow-hidden font-sans">
      {/* 배경 장식 글로우 */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(245,208,97,0.08)_0%,transparent_70%)] blur-2xl"></div>
        <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(46,81,162,0.18)_0%,transparent_70%)] blur-3xl"></div>
        <div className="absolute bottom-10 -right-40 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(212,175,55,0.08)_0%,transparent_70%)] blur-3xl"></div>
      </div>

      {/* 알림 토스트 */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl bg-[#0f1b3b] border border-[#f5d061] text-[#f5d061] font-semibold text-sm shadow-[0_8px_30px_rgba(245,208,97,0.35)] backdrop-blur-md transition-all flex items-center gap-2">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 상단 헤더 */}
      <header className="relative z-10 border-b border-[#f5d061]/20 bg-[#070d1e]/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#fff3b0] via-[#f7d070] to-[#c8881d] flex items-center justify-center font-black text-xl text-[#070d1e] shadow-[0_0_15px_rgba(245,208,97,0.4)]">
              S
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-[#fff3b0] to-[#f7d070] bg-clip-text text-transparent">
                스킬투머니
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs text-[#95a3c3] font-medium">
                원데이 클래스
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-sm px-3.5 py-1.5 rounded-full bg-[#101d3f] border border-[#f5d061]/40 text-[#f5d061] font-bold">
              강좌 {courses.length}개 개설 중
            </span>
            <a
              href="/lab05.html"
              className="text-xs sm:text-sm px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              실습실 ↗
            </a>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠: 강좌 목록 섹션 */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-5 py-12 sm:py-16 flex flex-col items-center">
        {/* 섹션 머리글 */}
        <div className="text-center max-w-2xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101d3f]/90 border border-[#f5d061]/35 text-[#f5d061] text-xs sm:text-sm font-semibold mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#f5d061] animate-ping"></span>
            배운 기술이 돈이 되는 원데이 클래스
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            실시간 <span className="bg-gradient-to-r from-[#fff3b0] via-[#f7d070] to-[#e5a93b] bg-clip-text text-transparent">원데이 강좌 좌석 현황</span>
          </h1>

          <p className="text-sm sm:text-base text-[#95a3c3] leading-relaxed">
            각 강좌의 맞춤 태그와 실시간 잔여석을 확인해 보세요.
          </p>
        </div>

        {/* 요구사항: 강좌 목록 위의 "예약 가능한 강좌만 보기" 체크박스 영역 */}
        <div className="w-full flex items-center justify-between mb-8 pb-4 border-b border-white/10 flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm text-[#95a3c3]">
              전체 <strong className="text-white">{courses.length}개</strong> 중{" "}
              <strong className="text-[#f5d061]">{displayedCourses.length}개</strong> 강좌 표시 중
            </span>
          </div>

          <label
            htmlFor="onlyAvailableCheckbox"
            className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#101d3f]/90 border border-[#f5d061]/35 hover:border-[#f5d061] text-xs sm:text-sm font-semibold text-white cursor-pointer select-none transition-all shadow-sm active:scale-95"
          >
            <input
              type="checkbox"
              id="onlyAvailableCheckbox"
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
              className="w-4 h-4 rounded accent-[#f5d061] cursor-pointer"
            />
            <span>예약 가능한 강좌만 보기</span>
          </label>
        </div>

        {/* 강좌 카드 그리드 (displayedCourses 렌더링) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 w-full">
          {displayedCourses.map((course: Course) => {
            // 남은 좌석 = 정원(seat) - 예약 인원(booked)
            const remaining = course.seat - course.booked;

            // 규칙: 0석이면 마감, 1~2석이면 마감 임박, 3석 이상이면 배지 없음
            let badgeText: string | null = null;
            if (remaining === 0) {
              badgeText = "마감";
            } else if (remaining === 1 || remaining === 2) {
              badgeText = "마감 임박";
            }

            return (
              <div
                key={course.id}
                className={
                  "group relative flex flex-col justify-between rounded-2xl bg-[#101d3f]/75 border transition-all duration-300 overflow-hidden backdrop-blur-md " +
                  (remaining === 0
                    ? "border-slate-700/60 opacity-90"
                    : "border-[#f5d061]/25 hover:border-[#f5d061] hover:-translate-y-2 hover:shadow-[0_18px_36px_rgba(0,0,0,0.5),0_0_25px_rgba(245,208,97,0.22)]")
                }
              >
                {/* 상단 썸네일 영역 */}
                <div className="relative h-40 bg-gradient-to-br from-[#0e1936] via-[#14224b] to-[#1d3066] flex flex-col items-center justify-center p-5 border-b border-[#f5d061]/15 overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(245,208,97,0.18)_0%,transparent_60%)]"></div>

                  {/* 좌상단: Class 번호 */}
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#070d1e]/85 border border-[#f5d061]/40 text-[#f5d061] text-[11px] font-bold backdrop-blur-sm">
                    Class #{course.id}
                  </div>

                  {/* 우상단: 마감 / 마감 임박 상태 배지 */}
                  {badgeText && (
                    <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded bg-red-600 text-white text-[11px] font-extrabold shadow-md animate-pulse">
                      {badgeText}
                    </div>
                  )}

                  {/* 대형 아이콘 */}
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
                    {getCourseIcon(course.name)}
                  </div>

                  {/* 개강 날짜 */}
                  <div className="mt-1.5 text-xs text-[#95a3c3] font-medium">
                    일정: {course.date}
                  </div>
                </div>

                {/* 카드 본문 */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* 강좌 이름 */}
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#fff3b0] transition-colors">
                      {course.name}
                    </h3>

                    {/* 강좌 이름 아래의 작은 태그 배지 목록 */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {course.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-[#070d1e]/85 border border-[#f5d061]/35 text-[#f5d061] shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* 좌석 현황 박스 */}
                    <div className="rounded-xl bg-[#070d1e]/80 border border-[#f5d061]/20 p-3 mb-4">
                      <div className="flex items-center justify-between text-xs font-medium mb-1.5">
                        <span className="text-[#95a3c3]">좌석 현황</span>
                        <span className="font-bold text-white">
                          남은 좌석{" "}
                          <span
                            className={
                              remaining === 0
                                ? "text-red-400 font-extrabold"
                                : remaining <= 2
                                ? "text-red-400 font-extrabold"
                                : "text-[#f5d061] font-extrabold"
                            }
                          >
                            {remaining}석
                          </span>{" "}
                          / {course.seat}명
                        </span>
                      </div>

                      {/* 좌석 게이지 바 */}
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={
                            "h-full rounded-full transition-all duration-500 " +
                            (remaining === 0
                              ? "bg-slate-600"
                              : remaining <= 2
                              ? "bg-red-500"
                              : "bg-gradient-to-r from-[#fff3b0] to-[#f7d070]")
                          }
                          style={{
                            width: ((course.booked / course.seat) * 100) + "%",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* 수강료 및 예약 버튼 */}
                  <div className="pt-3 border-t border-white/10 flex flex-col gap-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-[#95a3c3]">수강료</span>
                      <div className="flex items-baseline gap-0.5">
                        <span className="text-xl font-black text-[#f5d061] tracking-tight">
                          {course.price.toLocaleString()}
                        </span>
                        <span className="text-xs font-bold text-white">원</span>
                      </div>
                    </div>

                    {remaining === 0 ? (
                      <button
                        disabled
                        aria-disabled="true"
                        className="w-full py-2.5 px-3 rounded-xl font-bold text-slate-400 bg-slate-800/80 border border-slate-700/80 cursor-not-allowed select-none shadow-none text-xs flex items-center justify-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                        <span>예약 마감</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBooking(course)}
                        className="w-full py-2.5 px-3 rounded-xl font-bold text-[#070d1e] bg-gradient-to-r from-[#fff3b0] via-[#f7d070] to-[#e5a93b] hover:from-white hover:via-[#fce28b] hover:to-[#f3ba49] transition-all duration-200 shadow-[0_4px_14px_rgba(245,208,97,0.3)] hover:shadow-[0_6px_20px_rgba(245,208,97,0.5)] active:scale-95 text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>예약하기</span>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 예약 모달 팝업 */}
        {selectedCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl bg-[#0d1733] border-2 border-[#f5d061] p-6 text-white shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(245,208,97,0.3)]">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getCourseIcon(selectedCourse.name)}</span>
                  <h4 className="text-lg font-bold text-[#f5d061]">
                    {selectedCourse.name + " 예약 신청"}
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="text-slate-400 hover:text-white text-xl p-1"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 mb-6 text-sm text-[#e4e9f5]">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-[#95a3c3]">강좌명</span>
                  <span className="font-semibold text-white">{selectedCourse.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-[#95a3c3]">태그</span>
                  <div className="flex gap-1">
                    {selectedCourse.tags.map(t => (
                      <span key={t} className="text-xs text-[#f5d061]">#{t}</span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-[#95a3c3]">일정</span>
                  <span>{selectedCourse.date}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-[#95a3c3]">좌석 현황</span>
                  <span className="font-bold text-[#f5d061]">
                    {"남은 좌석 " + (selectedCourse.seat - selectedCourse.booked) + "석 / 정원 " + selectedCourse.seat + "명"}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-[#95a3c3]">수강료</span>
                  <span className="text-xl font-black text-[#f5d061]">
                    {selectedCourse.price.toLocaleString()}원
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 font-semibold text-sm transition-all cursor-pointer"
                >
                  취소
                </button>
                <button
                  onClick={() => {
                    alert(selectedCourse.name + " 예약이 완료되었습니다! 안내 문자가 발송되었습니다.");
                    setSelectedCourse(null);
                  }}
                  className="flex-1 py-3 rounded-xl font-bold text-[#070d1e] bg-gradient-to-r from-[#fff3b0] via-[#f7d070] to-[#e5a93b] hover:from-white hover:to-[#f3ba49] transition-all text-sm shadow-[0_4px_16px_rgba(245,208,97,0.4)] cursor-pointer"
                >
                  결제 및 예약 확정
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 하단 푸터 */}
      <footer className="relative z-10 border-t border-[#f5d061]/20 py-8 px-5 text-center text-xs text-[#95a3c3]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 스킬투머니 (SkillToMoney). All rights reserved.</p>
          <p className="text-[#f5d061]">배운 기술이 돈이 되는 원데이 클래스</p>
        </div>
      </footer>
    </div>
  );
}
