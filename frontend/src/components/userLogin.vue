<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  }
}
</script>
<template>
    <main>
        <div>
            User Login
        </div>
        <div>
          <label>
            <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="user.username"
              />
          </label>
        </div>
    </main>
</template>