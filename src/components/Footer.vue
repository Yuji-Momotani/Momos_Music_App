<template>
  <div class="Footer bg-gray-800 body-font">
    <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
      <router-link to="/" class="flex title-font font-medium items-center md:justify-start justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 m-auto stroke-current text-green-300 icon-size" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
        <span class="ml-3 text-xl">Momo's Music App</span>
      </router-link>
      <p class="text-sm sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
        © 2022- Yuji Momotani
      </p>
      <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
        <a href="https://twitter.com/uz1016peach" target="_blank" rel="noopener noreferrer" class="ml-3">
          <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5 text-white" viewBox="0 0 24 24">
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
          </svg>
        </a>
        <a href="https://www.instagram.com/yuzi8757momotani" target="_blank" rel="noopener noreferrer" class="ml-3">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
          </svg>
        </a>
        <a href="https://github.com/yuji1016-momo/" target="_blank" rel="noopener noreferrer" class="ml-3">
          <img src="../assets/GitHub-Mark-Light-32px.png" alt="GitHubのアイコン" class="w-5 h-5">
        </a>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
}
</script>