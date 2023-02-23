<template>
  <canvas
    id="canvasDom"
    :width="width"
    :height="height"
    @click="resetCode"
    style="cursor: pointer"
  ></canvas>
</template>

<script lang="ts" setup>
import { onMounted, withDefaults } from 'vue';

interface IProps {
  width: number;
  height: number;
  pool?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  pool: 'qwertyupasdfghjkzxcvbnm23456789',
});

const emit = defineEmits(['code']);

onMounted(() => {
  const verificationCode = initVerificationCode(
    props.width,
    props.height,
    props.pool
  );
  emit('code', verificationCode);
});

function resetCode() {
  const verificationCode = initVerificationCode(
    props.width,
    props.height,
    props.pool
  );
  emit('code', verificationCode);
}

function initVerificationCode(width: number, height: number, pool: string) {
  // 随机数
  function randomNum(min: number, max: number): number {
    const res = Math.random() * (max - min) + min;
    return parseInt(res as unknown as string);
  }

  // 随机颜色，0~255，值越高，颜色越浅
  function randomColor(min: number, max: number) {
    const red = randomNum(min, max);
    const green = randomNum(min, max);
    const blue = randomNum(min, max);
    return `rgb(${red},${green},${blue})`;
  }

  let result = '';
  const canvas = document.getElementById('canvasDom') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  ctx.fillStyle = randomColor(180, 230); // 绘制背景颜色
  ctx.fillRect(0, 0, width, height); // x, y, width, height

  for (let i = 0; i < 4; i++) {
    const rStr = pool[randomNum(0, pool.length)]; // 随机字母或数字
    const fontSize = randomNum(20, 25); // 随机数字体大小
    const deg = randomNum(-5, 5); // 随机旋转角度

    ctx.font = fontSize + 'px Simhei'; // 文字大小
    ctx.textBaseline = 'alphabetic'; // 文字基线
    ctx.fillStyle = randomColor(80, 150); // 字体颜色
    ctx.save(); // 保存画笔
    ctx.translate(20 * i + 10, 0); // 文字定位
    ctx.rotate((deg * Math.PI) / 180);
    ctx.fillText(rStr, 0, 25);
    ctx.restore();
    result += rStr;
  }

  // 随机干扰线
  for (let j = 0; j < 3; j++) {
    ctx.beginPath(); // 开始绘制线
    ctx.moveTo(randomNum(0, width), randomNum(0, height)); // x, y
    ctx.lineTo(randomNum(0, width), randomNum(0, height)); // x, y
    ctx.strokeStyle = randomColor(180, 230);
    ctx.closePath();
    ctx.stroke();
  }

  // 随机生成干扰点
  for (let i = 0; i < 30; i++) {
    ctx.beginPath();
    ctx.arc(randomNum(0, width), randomNum(0, height), 1, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = randomColor(150, 200);
    ctx.fill();
  }

  return result;
}
</script>
