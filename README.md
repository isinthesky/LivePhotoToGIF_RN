# 📸**LivePhotoToGIF_RN**

### 영상을 GIF파일로 변환하여 사람들과 공유할 수 있는 모바일 애플리케이션입니다.

### GIF파일의 옵션을 제어하여 변환 할 수 있습니다.

<br>

# Table of Contents

- [Preview](#preview)
- [Features](#features)
- [Motivation](#motivation)
- [Challenges](#challenges)
  - [1. 비디오에서 이미지 추출은 어떻게 해야할까?](#1-비디오에서-이미지-추출은-어떻게-해야할까)
    - [a. FFmpeg vs OpenCV](#a-ffmpeg-vs-opencv)
    - [b. npm 라이브러리가 아닌 FFmpeg을 Node.js환경에서 어떻게 실행할 수 있을까?](#b-npm-라이브러리가-아닌-ffmpeg을-nodejs환경에서-어떻게-실행할-수-있을까)
  - [2. 이미지파일을 어떻게 움직이는 GIF 파일로 만들 수 있을까?](#2-이미지파일을-어떻게-움직이는-gif-파일로-만들-수-있을까)
    - [a. GIF의 구조를 먼저 살펴보자.](#a-gif의-구조를-먼저-살펴보자)
    - [b. GIF File 구조에 Image Frame을 쌓는다면?](#b-gif-file-구조에-image-frame을-쌓는다면)
    - [c. GIF에 어떤 Image를 삽입 해야 할까?](#c-gif에-어떤-image를-삽입-해야-할까)
    - [d. 8bit Bitmap?](#d-8bit-bitmap)
    - [e. FFmpeg을 활용하여 Bitmap File을 추출해보자](#e-ffmpeg을-활용하여-bitmap-file을-추출해보자)
    - [f. LZW 압축이란?](#f-lzw-압축이란)
    - [g. GIF option 적용](#g-gif-option-적용)
  - [3. 너무나 많은걸 할 수 있는 FFmpeg](#3-너무나-많은걸-할-수-있는-ffmpeg)
    - [a. 문제: Video의 Raw Data는 Bitmap이 아니다.](#a-문제-video의-raw-data는-bitmap이-아니다)
    - [b. 구현방향 수정: 효율과 과정사이](#b-구현방향-수정-효율과-과정사이)
  - [4. React navtive CLI?](#4-react-navtive-cli)
    - [a. 심플하지만 다있는 UI](#a-심플하지만-다있는-ui)
    - [b. Navigation으로 모션 화면전환](#b-navigation으로-모션-화면전환)
    - [c. Video File 전송](#c-video-file-전송)
- [Timeline](#timeline)
- [Video](#video)
- [Tech stack](#tech-stack)
- [Repository Link](#repository-link)
- [Memoir](#memoir)

<br>

<p>

# Preview

| 기본 화면                                                                                                         | 영상 등록 화면                                                                                                    | 변환 완료 화면                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| ![IMG_2298](https://github.com/isinthesky/LivePhotoToGIF_RN/assets/52302090/f7c0bfb3-95b8-4896-a139-9a06361b1aa3) | ![IMG_2299](https://github.com/isinthesky/LivePhotoToGIF_RN/assets/52302090/8701ab42-83c2-4576-b164-19044ac4af5d) | ![IMG_2300](https://github.com/isinthesky/LivePhotoToGIF_RN/assets/52302090/05420e69-ad66-46ea-8058-4f89f9b9e7c2) |

<br>
</p>
<p>

# Features

- 상단에 핑크색 `+` 버튼을 눌러 GIF로 변환할 Video를 선택합니다.
- 선택한 Video의 재생시간, 크기 정보와 미리보기 화면을 통해 올바른 Video의 등록을 확인합니다.
- 정상적으로 Video가 등록되면 하단의 **Convert** 버튼이 진한 핑크로 활성화 됩니다.
- **Scale** 옵션을 통하여 출력 이미지 크기를 조절하고 GIF Output Info 칸에서 실제로 출력될 이미지 크기를 확인합니다.
- **FPS** 옵션을 조절해 1초에 몇개의 이미지를 재생할 건지 설정합니다. (기본 10개)
- **Speed** 옵션을 조절해 GIF의 재생속도를 설정 합니다. (기본 1배)
- **Flip**(상하반전), **Mirror**(좌우반전) 토글 버튼을 터치해 옵션을 활성화 할 수 있습니다.
- 원하는 옵션 설정 후 **Convert**버튼을 터치하여 GIF 변환을 시작합니다.
- 변환 중을 표현하는 로딩화면 이후 결과 화면으로 변경되고 변환된 GIF Image가 모바일 화면에 재생됩니다.
- 이미지를 길게 누르거나 **DownLoad** 버튼을 터치하여 Memo, 카카오톡 등 앱을 통해서 다운로드하고 공유할 수 있습니다.

<br>
</p>
<p>

# Motivation

영상에 관심이 많은 저는 미디어를 다루는 프로젝트 아이디어를 고심했습니다. 미디어를 다루는 라이브러리를 사용하기보다는 컨텐츠의 데이터에 접근해보고 싶었습니다. 비디오에서 bmp, GIF로 포맷 변환 하는 과정을 거치며 해당 미디어 포맷에 대한 특징과 구성, 파일 시스템을 깊이 배워보는 좋은 기회로 생각되어 시작하게 되었습니다. 

영상에서 GIF 포맷으로 쉽고 빠르게 변환하여 반복 재생되는 GIF의 재미를 공유할 수 있게 구성했습니다. 또한 개발을 접하고 처음 React native를 통해 모바일 환경에 도전하여 새로운 환경을 이해해 보고 싶었습니다.

<br>
</p>


# Challenges

## 1. 비디오에서 이미지 추출은 어떻게 해야할까?

<p>

### a. FFmpeg vs OpenCV

ffmepg 라이브러리의 사용 경험이 있었지만 OpenCV로도 Video에서 이미지 추출이 가능하다는 정보를 얻었습니다. 거의 모든 미디어의 encoding decoding을 지원하고 범용적으로 쓰이는 FFmpeg은 OpenCV도 활용하고 있다는 정보도 얻을 수 있었습니다.

OpenCV를 사용하면 Image processing에 대한 장점 있어, 다양한 이미지 효과를 적용하기에 좋다고 생각했고 FFmpeg은 영상에 대한 encoding, decoding, filter 적용에 이점이 있어 OpenCV를 사용하는게 나아 보였지만 쉽고 간단한 동작으로 GIF로 빠르게 변환하는 저의 프로젝트에서는 FFmpeg을 선택하는게 더 가볍고 간편하게 사용할 수 있다고 생각하여 FFmpeg을 직접 사용했습니다.

| 구분 | FFmpeg          | OpenCV           |
| ---- | --------------- | ---------------- |
| 활용 | 모든 Media 범용 | Image 프로세싱   |
| 실행 | 외부 실행파일   | Software Library |
| 강점 | Media Converter | Data Science     |

<br>

</p>
<p>

### b. npm 라이브러리가 아닌 FFmpeg을 Node.js환경에서 어떻게 실행할 수 있을까?
<br>

**b.1 Node.js 환경에서 외부파일을 실행해주는 모듈**
<br >

| 구분 | [child_process](https://nodejs.org/dist/latest-v20.x/docs/api/child_process.html)          | [ShellJS](https://www.npmjs.com/package/shelljs)           |
| ---- | --------------- | ---------------- |
| 사용방법 | Node.js의 기본 내장 모듈  | npm 모듈 설치   |
| 장점 | exec, spawn 등 실행방법의 다양한 메소드 제공 | Windows/Linux/OS X, 다양한 OS 환경을 지원한다. |
| FFmpeg 사용에 적합한가? | 실행과 argument 삽입이 가능 | 실행과 argument 삽입이 가능 |


Node.js 환경에서는 대표적으로 두가지 방법을 사용할 수 있었습니다.
Node.js의 기본 내장 모듈사용이라는 편의성으로 child_process를 사용했습니다. 중요한 FFmpeg을 실행하고 원하는 결과를 얻어 내야 하는데 두 방법 argument를 추가하여 실행이 가능해서 FFmpeg을 실행하는 데에는 문제가 없었습니다.

<br>

**b.2 child_process에서 제공하는 메서드**
<br>

| 구분 | exec          | spawn           |
| ---- | --------------- | ---------------- |
| 장점 | 연속된 명령어 사용에 용이  | 새로운 프로세스를 활용하여 실행  |
| 비고 | 메모리 제한 있음(기본 200kb) | 메모리 제한 없음 |

FFmpeg의 사용은 Video File을 decoding하게 되고 많은 메모리를 사용하기 때문에 spawn 메소드를 활용하게 되었습니다. spawn매서드는 새 서브 프로세서 생성하여 실행하기 때문에 병렬 프로세싱 작업에도 적합할 거라 생각했습니다.

코드에서 사용한 `child_process.spawn` 메서드는 Node.js 이벤트 루프를 차단하지 않고 **자식 프로세스를 비동기적으로 실행**되기 때문에 `child_process.spawn({FFmpeg path}, [FFmpeg options])` 실행 후 `Callback` 함수를 `Promise`로 감싸 코드의 흐름을 제어했습니다.[[code](https://github.com/isinthesky/VideoToGIF_Sever/blob/37d513f29828a4318038c3615147b1ad148cc5e5/src/lib/extractBmp.js#L19)]

<br>
</p>
<p>

## 2. 이미지파일을 어떻게 움직이는 GIF 파일로 만들 수 있을까?

<br>
</p>
<p>

### a. GIF의 구조를 먼저 살펴보자.

 큰 틀에서 보면 앞쪽 Image Header 부분과 반복되는 Image Frame 부분으로 나눌 수 있습니다.

![GIF_File_Stream](https://github.com/isinthesky/LivePhotoToGIF_RN/assets/52302090/db9544e7-c8c7-4fb5-874f-d1140eaa4976)<br>

<br>
</p>
<p>

### b. GIF File 구조에 Image Frame을 쌓는다면?

![GIF File Structure](https://github.com/isinthesky/LivePhotoToGIF_RN/assets/52302090/c34ebb9a-6acb-4010-8b01-630d758f60be)

> a 단락의 GIF구조를 바탕으로 실제 데이터를 쌓는다면 이런 모습이 됩니다.

<br>

**b-1. GIF Header에 필요한 정보**

GIF Info Header영역에 고정된 크기의 그래픽 영역('논리적 화면') 정보와 GIF 파일은 버전을 나타내는 고정 길이 헤더("GIF87a" 또는 "GIF89a")로 정보, 그뒤로 논리 화면의 픽셀 크기 및 기타 특성을 나타내는 고정 길이 논리 화면 설명자를 넣어줍니다.<br>화면 설명자는 또한 글로벌 컬러 테이블(GCT)의 존재 여부와 크기를 지정할 수 있으며, 저는 각 이미지 프레임에 Local Color Table을 사용하게 하였고 글로벌 컬러 테이블(GCT)는 생략했습니다.

**b-2. Image Frame 삽입에 필요한 정보**

GIF 파일은 `Image Frame Data` 에 **LZW 압축 알고리즘**이 적용되어 있습니다.

GIF 파일의 **Image Frame을** 구성하기위해 Bitmap File에서 사용하는 데이터는 위 이미지와 같이 `Color Table` 과 `Image Data`입니다.<br>
`Color Table`은 그대로 데이터를 삽입하지만 `Image Data`는 **LZW 데이터 압축**을 적용해 준 후에 삽입해야합니다. 
> [f. LZW 압축이란?](#f-lzw-압축이란)


<br>
</p>
<p>

### c. GIF에 어떤 Image를 삽입 해야 할까?

| GIF File Format Summary | 주요 설명           |
| --------------- | ---------------- |
| <img width="382" alt="gif-format" src="https://github.com/isinthesky/VideoToGIF_RN/assets/52302090/efc83030-a488-4fe8-a244-b1d3b5383c55">  | - Bitmap Image를 프레임으로 사용<br>- 8bit format까지 지원<br>- LZW 압축방식<br>- bitmap file 형식과 같은 little endian File형식 |
(출처: https://www.fileformat.info/format/gif/egff.htm)

<br>
</p>
<p>

### d. 8bit Bitmap?

우리가 웹에서 사용하는 Bitmap File의 포맷은 24 또는 32bit Bitmap 입니다.
조금은 생소한 8bit Bitmap은 뿌옇게 변해버리는 GIF 이미지의 원인입니다.

앞의 숫자 bit는 Bitmap 이미지 파일이 사용하는 Pixel의 색상의 갯수입니다. 따라서 8bit Bitmap File은 256개의 color를 가지고 이미지를 표현하게 됩니다.
8bit Bitmap은 256개 RGB Color의 color table을 소유하고 실제 image data array에서 해당 color의 table 위치값으로 Bitmap을 표현하게 됩니다.


| Bitmap Color Bit  | Pixel 표현 형식    | 비고 |
| --------------- | ---------------- | --- |
| 8bit Bitmap | [ 1 Pixel : [Color table position : 8bit] ] | <img width="288" alt="스크린샷 2023-06-05 오후 10 26 23" src="https://github.com/isinthesky/LivePhotoToGIF_RN/assets/52302090/2d3a1920-d513-4f87-b24a-aefe03723768"> |
| 24bit Bitmap | [ 1 Pixel : [R : 8bit] [G : 8bit] [B : 8bit] ] |  Color table을 사용하지 않고<br>해당 픽셀 값에 직접 RGB 값으로 표현 |

<br>
</p>
<p>

### e. FFmpeg을 활용하여 Bitmap File을 추출해보자

FFmpeg에 `pixel_format` 명령에 8Bit Bitmap 추출 옵션인 `bgr8`를 적용하여 Bitmap 파일을 얻을 수 있었습니다.

```
FFmpeg -i {inputPath.mp4} -pix_fmt {bgr8} {outputPath.bmp}
```

(Bitmap image data 배열은 **windows의 little endian 형식**으로 배열로 파일을 가져왔을 때 bgr 형식으로 읽어오게 됩니다.)<br>

<br>
</p>
<p>

### f. LZW 압축이란?

LZW 알고리즘은 Lempel-Ziv-Welch의 약자로 **무손실 압축 알고리즘**입니다.<br>
Lempel-Ziv가 만든 LZ78 알고리즘을 개선한 버전입니다.<br>
LZW의 핵심 아이디어는 데이터 공간을 절약하기 위해 **반복되는 Data의 패턴을 만들어서 재사용**합니다.<br>

일반적으로 ASCII 코드는 각 문자를 7비트를 사용하고(0~127) 마지막 1비트를 checksum으로 활용합니다.

LZW에서는 마지막 bit를 활용하여 0x80(128)부터 0xFF(255)까지의 숫자를 한 개의 문자 대신에 둘, 셋 또는 그 이상의 문자열을 표현하는데 사용합니다. 하나의 문자로 구성된 문자열은 유니그램(unigram), 두 개 문자로 구성된 문자열을 바이그램(bigram)이라 하고, 세 개의 문자로 구성된 문자열을 트라이그램(trigram)이라고 합니다. 이보다 더 긴 문자열은 구성하는 문자의 수에 그램(gram)이라는 접미사를 붙여서 부르고, 일반적으로 n-gram이라고 합니다. <br>그래서 0부터 127까지는 유니그램을 표현하는데 사용하고, 128부터 255까지는 유니그램이 아닌 1보다 큰 n-gram을 나타내는데 사용합니다.

이 추가적인 부분에 들어가는 것은 한 번 이상 나온 문자의 결합 (Combinations of symbols) 값이 들어가게 됩니다.

```
  *     PSEUDOCODE
  1     Initialize table with single character strings
  2     P = first input character
  3     WHILE not end of input stream
  4       C = next input character
  5
  6       IF P + C is in the string table
  7         P = P + C
  8       ELSE
  9         output the code for P
  10
  11      add P + C to the string table
  12        P = C
  13    END WHILE
  14
  15    output code for P
```

위에 수도코드는 LZW 알고리즘에 의해 확장된 공간 안에 중복되는 문자의 합을 넣기 위해 테이블을 만드는 과정입니다. P를 첫 번째 문자, C를 다음 문자로 선언하고 테이블에서 P + C 값이 있는지 확인합니다. 없으면 string table에 추가합니다. P + C의 테이블 값이 없을 때까지 계속 진행한다. 이렇듯 문자열의 끝까지 진행하여 테이블을 만들고 압축을 하게됩니다.

<br>
</p>
<p>

### g. GIF option 적용

scale - Bitmap의 메모리 저장, 이미지 처리 효율 특성으로 이미지 너비를 4배수로 처리 했습니다.

```
FFmpeg -i {inputPath.mp4} -vf scale={width-px:height-px} {outputPath.bmp}
```

flip/mirror - FFmpeg에서 Bitmap File을 추출하는 과정에서 flip/mirror 옵션을 추가하여 옵션을 적용한 이미지를 얻을 수 있게 했습니다.

```
FFmpeg -i {inputPath.mp4} -vf {vflip} {hflip} {outputPath.bmp}
```

delay - 이미지 삽입시 delay 다음 이미지로 전환 되는 지연시간으로 1/100초 단위로 세팅 됩니다. **delay = (time / fps) \* (time / speed)** fps 와 speed 값은 커질수록 다음 프레임으로 빨리 전환되는 수치이지만 GIF의 delay option 은 반대로 빨리 전환되기 위해 값이 작아져야 합니다. [ [code](https://github.com/isinthesky/VideoToGIF_Sever/blob/37d513f29828a4318038c3615147b1ad148cc5e5/src/lib/makeGif.js#L149) ]

<br>
</p>
<p>

## 3. 너무나 많은걸 할 수 있는 FFmpeg

### a. 문제: Video의 Raw Data는 Bitmap이 아니다.

FFmpeg을 활용하여 Video의 Raw Data를 추출한다면 Bitmap이 아니라 YUV파일이 추출되게 됩니다.(yuv420) 

추출한 yuv 파일을 `yuv viewer`앱을 통해서 정상 이미지를 확인한 후에 Bitmap 파일로 변환 하려고 하는 과정에서 옳은 방향인가에 대해서 고민하게 되었습니다. 예상을 벗어나는 Raw Data File의 엄청난 크기로 인해 다른 문제를 일으킬 가능성도 있어보였습니다.

- [yuv viewer [ YUView ]](https://github.com/IENT/YUView)

<br>
</p>
<p>

### b. 구현방향 수정: 효율과 과정사이

**h.264 -> yuv -> bitmap -> gif**로 이어지는 일련의 과정을 도전해 보고싶은 마음도 있었지만 목표인 GIF File을 빠르게 생성하는 것도 앱의 지향점이기 때문에 Video File에서 Bitmap Image를 추출하는 것으로 방향을 수정 했습니다. 또한 포맷 변경과정에서의 예상보다 훨씬 많은 메모리를 사용하는 것도 과정을 줄이게 되는 이유중에 하나 이기도 했습니다.<br>

조금 나중에 알게되었지만 FFmpeg을 사용하면 Video Format에서 곧바로 GIF Image로 변환도 가능합니다. 하지만 GIF File 구조를 직접 생성하는 과정에서 Frame Delay와 같은 개별적인 option 설정할 수 있기 때문에 장점도 있었습니다.

<br>
</p>
<p>

## 4. React navtive CLI?

일상생활에서 매일 모바일을 사용하지만 그동안 앱 개발에 대한 경험이 없었습니다. 

앱을 개발하는 현업에서는 React-Native Expo가 아닌 CLI로 작업을 한다는 얘기를 이따금 들었었고, Expo와 CLI환경의 장단점을 찾아보면서 CLI로 도전해보고 싶다는 생각이 들었습니다. Expo를 사용하면 Expo SDK에서 지원해주는 기능이 많고 간단하게 사용할 수 있기 때문에 빠르고 쉽게 개발할 수 있습니다. 하지만 Native Module과 연결하여 커스터마이징 할 수 없다는 단점과, 빌드할때 유료를 사용하지 않거나, 자체 빌드 서버가 없다면 빌드 큐에서 순서를 기다려야 한다는 단점이 존재합니다. <br>긴 빌드 시간과 Expo가 자체적으로 제공하는 기능이 많기 때문에 큰 용량 또한 단점이 되어 현업에서는 사용하지 않는다고 합니다. <br>따라서 Expo가 아닌 CLI로 개발을 진행하면서 직접 환경 설정, 빌드 등 여러 환경에 대한 경험을 해보고 네이티브 기능까지 확장할 수있는 가능성을 염두해 두고 프로젝트를 기획하게 되었습니다.

<br>
</p>
<p>

### a. 심플하지만 다있는 UI

쉽고 간단하게 GIF로 변환 하고 빨리 결과를 볼 수 있는 어플을 의도하고 제작하면서도 필수 기본적인 정보들(video infomation, preview, file size)을 담기위해 노력했습니다.

react native vlc media player를 활용하여 모바일에 저장된 Video File을 재생하였고 무한반복 기능을 설정하여 GIF로 변경되었을 때의 느낌을 미리 느껴볼 수 있도록 했습니다.

기본화면에는 앱의 제목이 표시되도록, **선택한 컨텐츠 정보가 `redux`에 담긴 후에는 VLC플레이어를 통하여 자동 재생, 무한 반복** 되도록 하였습니다.  <br> [[Preview](#preview)] [ [code](https://github.com/isinthesky/VideoToGIF_RN/blob/3993d1dd3a46a797a0d31d6a02842cf615b53ec5/src/components/GifInfo.js#L50) ]

<br>
</p>
<p>

### b. Navigation으로 모션 화면전환

페이지가 2개(옵션설정 메인창, 결과창) 인 모바일 어플리케이션이지만 버튼 만으로 페이지를 이동하고 싶지 않았습니다. `NativeStackNavigator`를 활용하여 메인창과 결과창을 이동가능하게 구성하였고, 측면의 넘기는 모션을 활용하여 화면 전환도 가능하게 하였습니다. [ [code](https://github.com/isinthesky/VideoToGIF_RN/blob/3993d1dd3a46a797a0d31d6a02842cf615b53ec5/src/navigator/AppNavigator.js#L12) ]

<br>
</p>
<p>

### c. Video File 전송

Video File을 서버로 전송하기위해 FormData형식을 활용하였습니다. <br>
처음엔 GIF의 옵션 정보를 보내기위해 두번 전송하는 구성을 했었는데 여러번의 시도와 수정 후에 FileData와 옵션 정보들을 함께 보낼 수 있었습니다. [ [code](https://github.com/isinthesky/VideoToGIF_RN/blob/3993d1dd3a46a797a0d31d6a02842cf615b53ec5/src/features/api/index.js#L11) ]

Node.js환경의 Express Server에서는 multer를 활용하여 File Data 전달 받았습니다.
body내 option 객체로 GIF 옵션 정보도 함께 전달 받았습니다.

```js
// Server
router.put("/", multer.single("file"), function (req, res, next) {
  const options = JSON.parse(req.body.option);
});
```

잘못된 데이터 전송으로 인한 server의 안전을 위해 multer 생성시점에 파일 사이즈의 **100MB**제한을 두었습니다.

```

multer({ storage, limits: { fileSize: 100000000 } });

```

<br>
</p>

# Timeline

### 프로젝트 기간: 2023.04.03(월) ~ 2023.04.28(금)

- 1 주차: 주제 선정, POC
- 2 주차: POC, 개발
- 3 ~ 4 주차: 개발, 발표

<br>

# Video

https://youtu.be/5NZXGDLRR6s

<br>

# Tech stack

## Frontend

| name | description   |
| ---- | --------------- |
| React native (CLI) | Native기능인 ios의 LivePhoto도 변환할 수 있는 확장성을 고려해 CLI를 선택하게 되었습니다. |
| react-redux | Video Content 정보와 GIF Option 정보 관리를 위해 사용하였습니다. |
| ESLint | - |

## Backend

| name | description   |
| ---- | --------------- |
| [Node.js](https://nodejs.org/ko/) | - |
| [Express](https://expressjs.com/ko/) | javascript로 구축할 수 있는 강력한 웹 server 플랫폼을 사용하였습니다. |
| [FFmpeg](https://FFmpeg.org/) | 강력한 디코딩 기능을 제공하는 FFmpeg을 사용함으로서 대부분의 Video Format에서 Bitmap File을 추출하기 위해 사용했습니다. |
| ESLint | - |

<br>

# Repository Link

[VideoToGIF_RN](https://github.com/isinthesky/VideoToGIF_RN)

[VideoToGIF_Sever](https://github.com/isinthesky/VideoToGIF_Sever)

<br>

# Memoir

FFmpeg을 통해 얻은 Bitmap File을 사용하여 GIF 파일을 생성하는 작업은 결과물을 너무나 간단해 보이지만 wikipedia의 Image foramt 문서를 통해 Bitmap File과 GIF File의 구조를 이해하고 GIF Header Data를 구성하고 Frame Image에 옵션을 설정하고 Image Data를 압축한 후에 GIF 파일에 삽입하는 일련의 과정들은 쉽지 않았습니다.

어찌보면 메인 도전이였던 GIF File 생성은 Standard Format이라는 정답이 있기 때문에 프로젝트를 완성하는 과정에서 다양한 접근방식이나 재미있는 아이디어를 코드에 녹이기 힘든 부분이 답답하면서도 어려웠습니다.

그럼에도 React Native Cli 환경에서 사용자 편의성을 고려한 Option Control들을 배치하고 모바일 앱에서 Server와 데이터를 주고 받으며 생성된 GIF가 모바일에서 로드되고 재생 됐을 때 매우 감격스러웠습니다.

이제는 낮은 화질과 낮은 압출 효율로 인해 GIF 사용을 지양하는 움직임도 있지만 Data Sheet를 보며 생성할 수 있는 재미있는 미디어 형식이지 않을까 생각합니다.<br>화려하고 역동적인 아이템도 많지만 data sheet와 hexadecimal, data position과 씨름하는 개발도 재미있다는 걸 느꼈습니다.
