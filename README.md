# 스푸키 타운 (Spooky Town)

공포 영화 팬을 위한 웹 애플리케이션으로, 영화 정보 제공, 스트리밍 서비스 안내, 매거진 콘텐츠를 제공합니다.

## 기술 스택

- **프론트엔드**: React + TypeScript + Vite
- **상태 관리**: TanStack Query
- **함수형 프로그래밍**: Effect
- **스타일링**: CSS Modules
- **배포**: GitHub Actions, AWS Lightsail

## 주요 기능

- 영화 정보 브라우징 및 검색
- 스트리밍 서비스 가용성 확인
- 사용자 프로필 관리
- 반응형 디자인 (모바일, 태블릿, 데스크톱)

## 개발 환경 설정

````bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 빌드
pnpm build

# 빌드 결과물 미리보기
pnpm preview
````


## 환경 변수

`.env` 파일에 다음 환경 변수를 설정해야 합니다:

````
VITE_API_URL=
VITE_API_KEY=
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_YOUTUBE_API_KEY=
VITE_POSTER_URL=
````


## 배포

GitHub Actions를 통해 main 브랜치에 푸시하면 자동으로 AWS Lightsail에 배포됩니다.

## 번들 최적화

번들 크기 최적화를 위해 다음 전략을 사용합니다:

- 코드 스플리팅 (라우트 기반)
- 벤더 청크 분리 (React, React Query, Effect)
- 이미지 최적화 (lazy loading)

## 브라우저 지원

- 최신 버전의 Chrome, Firefox, Safari, Edge
- 모바일 브라우저 지원

## 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다.
