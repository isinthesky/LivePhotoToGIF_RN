# 📸**LivePhotoToGIF_RN**

### 영상을 gif파일로 변환하여 저장하고 사랑들과 공유할 수 있는 모바일 어플리케이션입니다.

### gif파일의 옵션을 제어하여 생성 할 수 있습니다.

<br>

# Table of Contents

- [🔍 Preview](#-🔍-preview)
- [⚙️ Tech stack](#-⚙️-tech-stack)
- [💭 Motivation](#-💭-motivation)
- [💻 Features](#-💻-features)
- [💪 Challenges](#-💪-challenges)
- [📅 Timeline](#-📅-timeline)
- [🎥 Video](#-🎥-video)
- [🔗 Repository Link](#-🔗-repository-link)
- [📝 Memoir](#-📝-memoir)

<br>

# 🔍 Preview

livephotoTogif_rn.gif

<br>

# ⚙️ Tech stack

### Frontend

- React native
- react-redux
- Styled Components
- ESLint

### Backend

- [Node.js](https://nodejs.org/ko/)
- [Express](https://expressjs.com/ko/)
- [ffmpeg](https://ffmpeg.org/)
- ESLint

<br>

# 💭 Motivation

영상에 관심이 많은 저는 비디오을 다루는 프로젝트 아이디어를 고심했습니다.<br>
비디오에서 bmp, gif로 포맷 변환 하는 과정을 거치며 해당 미디어 포맷에 대한 특징과 구성, 파일 시스템을 깊이 배워보는 좋은 기회로 생각되어 시작하게 되었습니다.<br>
gif의 낮은 화질이 주는 옛감성을 쉽고 재미있게 느껴보고 싶었습니다.

<br>

# 💪 Challenges

## 1. 비디오에서 이미지 추출은 어떻게 해야할까?

### a. ffmpeg vs OpenCV

ffmepg 라이브러리의 사용 경험이 있었지만 OpenCV로도 video에서 이미지 추출이 가능하다는 문서를 찾았습니다.<br>
OpenCV도 ffmpeg을 사용한다는 글을 보았고 거의 `모든 미디어의 인코딩 디코딩을 지원하고 보편적으로 쓰이는` `ffmpeg 라이브러리`를 사용하게 되었습니다.

`챌린지가 아니고 사용방법이다. 개발 하면서 시행착오, 최종선택 원인, 과정`

### b. ffmpeg

ffmpeg의 사용법, options <br>
-vf : video filter<br>
-r : frame rate<br>
-pix_fmt : pixel format<br>
-y : overwrite<br>

```
ffmpeg -i {inputPath.mp4} -vf scale={width:height} -r {fps} -pix_fmt {bgr8} -y {outputPath.bmp}
```

<br>

## 2. 이미지파일을 어떻게 움직이는 GIF 파일로 만들 수 있을까?

`gif image data structure 예시 @이미지@`

대부분의 `GIF file`의 `세부내용????` , image data structure등을 wikipedia(https://en.wikipedia.org/wiki/GIF)에서 얻을 수 있었습니다.<br>

### a. GIF에 어떤 image format을 삽입 해야 할까??

최대 `8bit bitmap`이미지 형식을 지원하는 GIF는 ffmpeg의 추출 pixel_format 옵션에 `bgr8`를 적용하여 bitmap 파일을 얻었습니다. `bitmap file을 얻는 과정`,

### b. 8bit bitmap의 데이터 구조(header - color table - image data)

`bitmap 8bit data 구조 @이미지@`
`rgb, bgr 뒤집힌 이유 현상 변환과정`
`color table, image`

`Bitmap` 의 `pixel data`배열은 `bgr Type`으로 뒤집혀 있어 데이터를 뒤집어 주었습니다.
gif에 삽입하기 위한 이미지 데이터 8bit bitmap file에서 `color table`과 `image data`를 얻었습니다.

### c. file data 구조 쌓기, image frame 삽입

`gif file image header 설명`
`LZW 알고리즘 설명 왜 이거를 쓰는지`

gif file의 기본적인 header 설정 후 bmp data를 반복 삽입 가능하게 했습니다.<br>
bmp 이미지 데이터에 대한 `LZW 압축 알고리즘`을 적용했습니다.

### d. gif option 적용

scale - 메모리 저장, 이미지 처리 효율 특성으로 width는 4배수로 처리 했습니다.

delay - 이미지 삽입시 delay 다음 이미지로 전환 되는 지연시간으로 1/100초 단위로 세팅 됩니다.<br>gif 생성 옵션의 delay = (time / fps) \* (time / speed)

flip/mirror - ffmpeg에서 bitmap file을 추출하는 과정에서 flip/mirror 옵션을 추가하여 옵션을 적용한 이미지를 얻을 수 있게 했습니다.

<br>

## 3. react native cli

사용자의 간편한 사용성을 우선으로 ui를 구성하였습니다.

<br>

# 📅 Timeline

### 프로젝트 기간: 2023.04.03(월) ~ 2023.04.28(금)

- 1 주차: 주제 선정, POC
- 2 주차: POC, 개발
- 3 ~ 4 주차: 개발, 발표

<br>

# 🎥 Video

https://youtu.be/5NZXGDLRR6s

<br>

# 🔗 Repository Link

[LivePhotoToGIF_RN](https://github.com/isinthesky/LivePhotoToGIF_RN)

[LivePhotoToGIF_Sever](https://github.com/isinthesky/LivePhotoToGIF_Sever)

<br>

# 📝 Memoir

ffmpeg을 통해 얻은 bitmap 파일만으로 gif 파일을 생성하는 작업은 결과물을 너무나 간단해 보이지만 wikipedia의 image foramt 문서를 통해 bitmap file과 gif file의 구조를 이해하고 gif header data를 구성하고 image frame을 삽입하고 옵션을 적용하는 gif file 생성 과정은 쉽지 않았습니다.

어찌보면 메인 도전이였던 gif file 생성은 gif file format 이라는 정답이 있기 때문에 도전하는 과정은 잘못된 접근일 뿐 gif파일을 생성하며 고생했던 헤프닝을 문서에 녹이기 어려워 아쉬웠습니다.

그럼에도 react native cli 환경에서 user 편의성을 고려한 option control들을 배치하고 앱을 만들어 server와 데이터를 주고 받으며 모바일에서 생성된 gif가 실행 됐을 때 매우 만족스러웠습니다.

이제는 낮은 화질과 압출 효율로 인한 파일크기등 gif를 지양하는 움직임도 있지만 data sheet를 보며 생성할 수 있는 가장 재미있는 미디어 형식이지 않을까 생각합니다. 화려하고 역동적인 아이템도 많지만 data sheet와 hexadecimal, data position과 씨름하는 개발도 재미있다는 걸 느꼈습니다.
