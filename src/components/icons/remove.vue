<template lang="pug">
svg(xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="3 3 26 26")
  path(
    fill="slategray"
    d="M25.291 5.313v2.688h-18.624v-2.688h4.625l1.375-1.313h6.625l1.375 1.313h4.625zM7.979 25.312v-15.999h15.999v15.999c0 1.438-1.25 2.688-2.688 2.688h-10.625c-1.438 0-2.688-1.25-2.688-2.688h0.001z"
  )
</template>

<style scoped lang="scss">
svg {
  &:hover {
    cursor: pointer;
    path {
      fill: tomato;
    }
  }
}
</style>
