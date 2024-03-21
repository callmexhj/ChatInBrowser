<template>
    <div
      class="floating-ball"
      :style="{ left: position.left + 'px', top: position.top + 'px', width: containerWidth + 'px' }"
      @mousedown="startDrag"
    >
      <!-- 悬浮球容器 -->
      <div class="ball-container">
        <!-- 插槽内容 -->
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  let isDragging = ref(false);
  let startX, startY;
  let initialPosition = { left: window.innerWidth - 50, top: window.innerHeight / 3 - 25 };
  let position = ref(initialPosition);
  let containerWidth = ref(50); // 初始容器宽度
  const scrollbarWidth = getScrollbarWidth();
  const props = defineProps({
    showDialog: {
      type: Boolean,
      default: false
  
    }
  })
  
  const startDrag = (event) => {
    isDragging.value = true;
    startX = event.clientX - position.value.left;
    startY = event.clientY - position.value.top;
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', stopDrag);
  };
  
  const handleDrag = (event) => {
    if (isDragging.value) {
      let newLeft = event.clientX - startX;
      let newTop = event.clientY - startY;
  
      // 限制拖动范围，确保不超出窗口可视区域边界
      const maxLeft = window.innerWidth - containerWidth.value - scrollbarWidth;
      const maxTop = window.innerHeight - 50 - scrollbarWidth;
  
      newLeft = Math.max(0, Math.min(newLeft, maxLeft));
      newTop = Math.max(0, Math.min(newTop, maxTop));
  
      position.value.left = newLeft;
      position.value.top = newTop;
    }
  };
  
  const stopDrag = () => {
    isDragging.value = false
    document.removeEventListener('mousemove', handleDrag)
    document.removeEventListener('mouseup', stopDrag)
    // 吸附到页面两侧的任意高度
    if (position.value.left < window.innerWidth / 2) {
      position.value.left = 0
    } else {
      position.value.left = window.innerWidth - containerWidth.value - scrollbarWidth
    }
  };
  
  // 监听容器宽度变化
  watch(() => props.showDialog, () => {
    console.log(props.showDialog)
    if (props.showDialog) {
      containerWidth.value = 240
    } else {
      containerWidth.value = 50
    }
    console.log(containerWidth.value)
    handleResize()
    stopDrag()
  });
  
  // 监听窗口大小变化，确保容器不超出边界
  const handleResize = () => {
    const maxLeft = window.innerWidth - containerWidth.value - scrollbarWidth;
    position.value.left = Math.min(position.value.left, maxLeft);
  };
  
  onMounted(() => {
    window.addEventListener('resize', handleResize);
    handleResize()
  });
  
  // 获取滚动条宽度
  function getScrollbarWidth() {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
    document.body.appendChild(outer);
  
    const widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = 'scroll';
  
    // add innerdiv
    const inner = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);
  
    const widthWithScroll = inner.offsetWidth;
  
    // remove divs
    outer.parentNode.removeChild(outer);
  
    return widthNoScroll - widthWithScroll;
  }
  defineExpose({
    handleResize,
    stopDrag
  })
  </script>
  
  <style scoped>
  .floating-ball {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    /* cursor: grab; */
    transition: width 0.3s ease-in-out;
    z-index: 1001;
  }
  
  .ball-container {
    overflow: hidden;
    border-radius: 25px;
    transition: width 0.3s; /* 添加过渡效果 */
  }
  </style>
  