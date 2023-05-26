# 📸**LivePhotoToGIF_RN**

### 영상을 Gif파일로 변환하여 저장하고 사랑들과 공유할 수 있는 모바일 어플리케이션입니다.

### Gif파일의 옵션을 제어하여 생성 할 수 있습니다.

<br>

# Table of Contents

- [🔍 Preview](#-🔍-preview)
- [💭 Motivation](#-💭-motivation)
- [💻 Features](#-💻-features)
- [💪 Challenges](#-💪-challenges)
  - [1. 비디오에서 이미지 추출은 어떻게 해야할까?](##1-비디오에서-이미지-추출은-어떻게-해야할까?)
    - [a. ffmpeg vs OpenCV](###a-ffmpeg-vs-OpenCV)
  - [2. 이미지파일을 어떻게 움직이는 GIF 파일로 만들 수 있을까?](##2-이미지파일을-어떻게-움직이는-GIF-파일로-만들-수-있을까?)
    - [a. GIF에 어떤 image format을 삽입 해야 할까?](###a-GIF에-어떤-image-format을-삽입-해야-할까?)
    - [b. 8bit bitmap의 데이터 구조](###b-8bit-bitmap의-데이터-구조)
    - [c. file data 구조 쌓기, image frame 삽입](###c-file-data-구조-쌓기,-image-frame-삽입)
    - [d. gif option 적용](###d-gif-option-적용)
  - [3. React navtive cli?](##3-React-navtive-cli?)
- [📅 Timeline](#-📅-timeline)
- [🎥 Video](#-🎥-video)
- [⚙️ Tech stack](#-⚙️-tech-stack)
- [🔗 Repository Link](#-🔗-repository-link)
- [📝 Memoir](#-📝-memoir)

// 세부 목차 //

<br>

# 🔍 Preview

livephotoTogif_rn.gif

<br>

# 💭 Motivation

영상에 관심이 많은 저는 비디오을 다루는 프로젝트 아이디어를 고심했습니다.<br>
비디오에서 bmp, gif로 포맷 변환 하는 과정을 거치며 해당 미디어 포맷에 대한 특징과 구성, 파일 시스템을 깊이 배워보는 좋은 기회로 생각되어 시작하게 되었습니다.<br>
gif의 낮은 화질이 주는 옛감성을 쉽고 재미있게 느껴보고 싶었습니다.

// cli 추가 //

<br>

# 💪 Challenges

## 1. 비디오에서 이미지 추출은 어떻게 해야할까?

### a. ffmpeg vs OpenCV

ffmepg 라이브러리의 사용 경험이 있었지만 OpenCV로도 video에서 이미지 추출이 가능하다는 문서를 찾았습니다.<br>
거의 모든 미디어의 encoding decoding을 지원하고 범용적으로 쓰이는 ffmpeg은 OpenCV도 활용하고 있다는 정보도 얻을 수 있었습니다.<br>
OpenCV를 사용하면 image processing에 대한 장점 있어, 다양한 이미지 효과를 적용하기에 좋다고 생각했고<br>
ffmpeg은 영상에 대한 encoding, decoding, filter 적용에 이점이 있어 OpenCV를 사용하는게 나아 보였지만<br>
간단한 동작을 구현하는 저의 프로젝트에서는 ffmpeg을 선택하는게 더 가볍고 간편하게 사용할 수 있다고 생각하여 ffmpeg을 직접 사용하게 되었습니다.

| 구분 | ffmpeg          | OpenCV           |
| ---- | --------------- | ---------------- |
| 활용 | 모든 Media 범용 | Image 프로세싱   |
| 실행 | 외부 실행파일   | Software Library |
| 강점 | Media Converter | Data Science     |

### b. ffmpeg 사용방법

```
const execFile = require("child_process").spawn;

const ffmpeg_callback = execFile({ffmpeg}, [ffmpeg options]);

return new Promise(
  (resolve) => {
    ffmpeg.stdout.on("data", (x) => {
      process.stdout.write(x.toString());
    });
    ffmpeg.on("close", (code) => {
      resolve({ ok: true, code: code });
      return true;
    });
  },
  (reject) => {
    console.error("extractBmp error:", reject);
    return false;
  },
);
```

외부파일을 실행하는 ffmpeg을 사용하기위해 `child_process` 라이브러리를 활용하였고 `callback` 함수를 `promise`로 감싸 코드의 가독성을 향상시켰습니다.

<br>

## 2. 이미지파일을 어떻게 움직이는 GIF 파일로 만들 수 있을까?

GIF, Bitmap file 관련 정보는 wikipedia(https://en.wikipedia.org/wiki/GIF)에서 대부분 얻을 수 있었습니다.<br>

![gif_file_stream](https://github.com/isinthesky/LivePhotoToGIF_RN/assets/52302090/db9544e7-c8c7-4fb5-874f-d1140eaa4976)


### a. GIF에 어떤 image format을 삽입 해야 할까?

<img width="540" alt="스크린샷 2023-05-25 오후 9 56 07" src="https://github.com/isinthesky/LivePhotoToGIF_RN/assets/52302090/cf5ef29b-d337-4c85-bf05-0328b8fb3d6e"><br>
(출처: https://www.fileformat.info/format/gif/egff.htm)

최대 `8bit bitmap`이미지 형식을 지원하는 GIF는 ffmpeg의 추출 pixel_format 옵션에 8bit bitmap 추출 옵션인 `bgr8`를 적용하여 bitmap 파일을 얻었습니다.

### b. 8bit bitmap의 데이터 구조(header - color table - image data)

<img width="406" alt="스크린샷 2023-05-25 오후 10 13 05" src="https://github.com/isinthesky/LivePhotoToGIF_RN/assets/52302090/5ea36e41-ecb3-4142-a36d-aa1dce788e45">

`Bitmap` 의 `pixel data`배열은 `bgr Type`으로 뒤집혀 있어 데이터를 뒤집어 주었습니다.
(bitmap image data 배열은 windows의 little endian 형식으로 배열로 파일을 가져왔을 때 bgr 형식으로 읽어오게 됩니다.)

gif에 삽입하기 위한 이미지 데이터 8bit bitmap file에서 `color table`과 `image data`를 얻었습니다.

### c. file data 구조 쌓기, image frame 삽입

<img width="359" alt="스크린샷 2023-05-25 오후 10 38 52" src="https://github.com/isinthesky/LivePhotoToGIF_RN/assets/52302090/115aae8b-e316-4d6c-900b-31bd44468988">

gif file의 기본적인 header 설정 후 bmp data를 반복 삽입 가능하게 했습니다.<br>
bmp 이미지 데이터에 대한 `LZW 압축 알고리즘`을 적용했습니다.

### d. gif option 적용

scale - 메모리 저장, 이미지 처리 효율 특성으로 width는 4배수로 처리 했습니다.

delay - 이미지 삽입시 delay 다음 이미지로 전환 되는 지연시간으로 1/100초 단위로 세팅 됩니다.<br>gif 생성 옵션의 delay = (time / fps) \* (time / speed)

flip/mirror - ffmpeg에서 bitmap file을 추출하는 과정에서 flip/mirror 옵션을 추가하여 옵션을 적용한 이미지를 얻을 수 있게 했습니다.

```
ffmpeg -i {inputPath.mp4} -vf scale={width:height} -r {fps} -pix_fmt {bgr8} -y {outputPath.bmp}
```

// ffmpeg 활용한 세부 option 적용 code //

<br>

## 3. React navtive cli?

일상생활에서 매일 모바일을 사용하지만 그동안 앱 개발에 대한 경험이 없었습니다. 웹 환경이 아닌 앱 환경에 도전해보며 앱 환경을 이해해보는 시간을 갖기 위해 단기 프로젝트를 진행했습니다. React-Native라는 새로운 환경 그리고 게임이라는 새로운 장르에 도전하며 그동안 겸험하지 못했던 것들에 직접 부딪혀보고 싶었습니다. 단순 게임이 아닌 재밌는 아이디어와 함께 게임을 컨트롤 할 수 있는 방법을 고민해보았고, 얼굴 인식 데이터를 방향으로 변환하여 맵을 탈출하고, 소리의 데시벨 데이터를 사용하여 캐릭터를 컨트롤 하여 장애물을 피하는 게임을 기획하였습니다. 현업에서는 React-Native Expo가 아닌 CLI로 작업을 한다고 하였고, Expo의 장단점을 찾아보면서 CLI로 도전해보고 싶었습니다. Expo를 사용하면 Expo SDK에서 지원해주는 기능이 많고 간단하게 사용할 수 있기 때문에 빠르고 쉽게 개발할 수 있습니다. 하지만 Native Module과 연결하여 커스터마이징 할 수 없다는 단점과, 빌드할때 유료를 사용하지 않거나, 자체 빌드 서버가 없다면 빌드 큐에서 순서를 기다려야 한다는 단점이 존재합니다. 긴 빌드 시간과 Expo가 자체적으로 제공하는 기능이 많기 때문에 큰 용량 또한 단점이 되어 현업에서는 사용하지 않는다고 합니다. 따라서 Expo가 아닌 CLI로 개발을 진행하면서 직접 환경 설정, 빌드 등 모든 환경에 대한 경험을 해보고자 프로젝트를 기획하게 되었습니다.

# 📅 Timeline

### 프로젝트 기간: 2023.04.03(월) ~ 2023.04.28(금)

- 1 주차: 주제 선정, POC
- 2 주차: POC, 개발
- 3 ~ 4 주차: 개발, 발표

<br>

# 🎥 Video

https://youtu.be/5NZXGDLRR6s

<br>

# ⚙️ Tech stack

### Frontend

- React native (cli)
- react-redux
- ESLint

### Backend

- [Node.js](https://nodejs.org/ko/)
- [Express](https://expressjs.com/ko/)
- [ffmpeg](https://ffmpeg.org/)
- ESLint

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
