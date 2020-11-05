const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d'); // MDN 문서 참고
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('js_range');
const mode = document.getElementById('mode');
const saveBtn = document.getElementById('save');

const INITIAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = 700;

// 이거 필수! 캔버스 element에는 2개의 사이즈를 가져야함
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// 아래 2줄 없으면 투명배경이 됨. 디폴트 배경값이 흰색이 되게함.
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
// defualt value defined
ctx.strokeStyle = INITIAL_COLOR; // color value
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; // stroke thickness

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPaiting() {
  painting = true;
}

function onMouseMove(event) {
  // console.log(event);
  //  콘솔로그로 나오는 마우스위치 offsetX, offsetY 사용
  const x = event.offsetX;
  const y = event.offsetY;
  //   console.log(x, y);

  // 이하 MDN canvas API 참고
  if (!painting || filling) {
    // if I'm not painting or I am filling...
    ctx.beginPath(); // ?
    ctx.moveTo(x, y); // ?
  } else {
    ctx.lineTo(x, y); // 그림그릴 시작 위치를 잡음
    ctx.stroke(); // 실제로 그림
  }
}

function changeColor(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function changeRange(event) {
  // 이런건 console.log를 통해서 콘솔 내용을 확인후
  // 바꿔야할 대상 아이템 이름을 직접 확인하는게 좋다!
  const size = event.target.value;
  ctx.lineWidth = size;
}

// 클릭하면 버튼 내 글귀가 변하기
function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = 'Fill';
  } else {
    filling = true;
    mode.innerText = 'Paint';
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(evnet) {
  event.preventDefault();
}

function savingImg() {
  const image = canvas.toDataURL('image/png');
  const link = document.createElement('A'); // 존재하지 않는 링크 생성
  link.href = image;
  link.download = 'Painted by 🐱'; // 다운받는 이미지 제목
  link.click();
}

if (canvas) {
  //캔버스 위에 있는 마우스감지 mouse-move
  canvas.addEventListener('mousemove', onMouseMove);
  //클릭 감지  mouse-down
  canvas.addEventListener('mousedown', startPaiting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('click', handleCanvasClick);
  // context menu 안뜨게 우클릭방지
  canvas.addEventListener('contextmenu', handleCM);
}

// array를 만들어서 팔레트 개개의 컬러 구별
// 팔레트 내의 개개 컬러를 클릭하면 changeColor 펑션 실행
Array.from(colors).forEach((color) =>
  color.addEventListener('click', changeColor)
);

if (range) {
  range.addEventListener('input', changeRange);
}

if (mode) {
  mode.addEventListener('click', handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener('click', savingImg);
}
