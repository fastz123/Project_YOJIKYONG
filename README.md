![image](https://img.shields.io/badge/react-16.13.1-brightgreen) ![image](https://img.shields.io/badge/npm-6.13.4-blue) ![image](https://img.shields.io/badge/gradle-6.3-red) ![image](https://img.shields.io/badge/JDK-1.8-yellowgreen)  ![image](https://img.shields.io/badge/SPRING--BOOT-2.3.0-lightgreen) ![image](https://img.shields.io/badge/mysql-14.14-yellow)



# 요지경(지역화폐 간편 서비스) v1.0.0

#### 목표

- 경기지역 화폐를 사용하는 사용자가 주변의 사용처를 쉽게 검색할 수 있도록 하는 서비스를 만들고자 합니다.

#### 주차별 계획

| 주 차 | 계 획                            |
| ----- | -------------------------------- |
| 1주차 | 주제선정, 계획서 작성, 화면 기획 |
| 2주차 | 필요 기술 학습 (React, Django)   |
| 3주차 | 개발                             |
| 4주차 | 개발                             |
| 5주차 | 개선사항 추가개발                |
| 6주차 | 개선사항 추가개발                |
| 7주차 | 테스트 및 발표준비               |

#### 시스템 구성도

![image](/uploads/802dfa29171d53fb3c28d79083a737bf/image.png)

#### 향후 계획

- 데이터 수집 및 전처리 완료
- 배포 자동화
- Backend & Frontend 연결

#### 팀원

- 임대희 - 팀장, backend
- 김민호 - backend
- 김한솔 - frontend
- 오동현 - frontend
- 오승완 - frontend

#### 깃 규칙

- 커밋 메시지 - "날짜 (ex. 200503) | 메시지(ex. Update README.MD) | 작성자(ex. jackson)"
- 브랜치 생성 - "작업 부분(ex. frontend)_작업 내용(ex. searchapi)"

#### 실행방법

- backend - linux

```bash
$cd back-spring
$./gradlew build
$java -jar ./build/libs/${생성된 jar file} #java가 설치된 환경
```

- backend - window

  * IntelliJ IDE 이용
  * build 및 BackApplication.java Run

- frontend

```bash
$cd front
$npm install --save
$npm start //REACT_APP_PUBLIC_API_URL 값을 script에서 설정하거나 .env.development파일에서 설정
```

