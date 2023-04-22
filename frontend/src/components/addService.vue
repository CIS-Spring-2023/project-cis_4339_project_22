<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import axios from 'axios';
import serviceList from '@/components/serviceList.vue';
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  setup() {
    return {v$: useVuelidate({ $autoDirty: true }) }
  },
  components: {
    serviceList
  },
  data() {
    return {
      services: [],
      service: {
        title: '',
        status: 'Active' // Changed to a string for simplicity
      },
      editserviceID: null // Added for tracking the service being edited
    }
  },
  computed: {
    shouldShowAddButton() {
      // Return false if isEditMode is true, otherwise return true
      return this.editserviceID === null;
    },
    isEditMode() {
      return this.editserviceID !== null;
    }
  },
  methods: {
    async handleSubmitForm() {
      // Checks to see if there are any errors in validation
      const isFormCorrect = await this.v$.$validate()
      // If no errors found in validation, proceed with form submission
      if (isFormCorrect) {
        axios
        .post(`${apiURL}/services`, this.service)
        .then(() => {
          alert('Service has been added.')
          this.$router.push({ name: 'servicelisteditor' })
        })
        .catch((error) => {
          console.log(error)
        })
      }
    },
    editService(serviceID) {
      this.$router.push({ name: 'servicelisteditor', params: { id: serviceID } })
    },
    async updateService() {
      // Checks to see if there are any errors in validation
      const isFormCorrect = await this.v$.$validate()
      // If no errors found. isFormCorrect = True then the form is submitted
      if (isFormCorrect) {
        axios
        .put(`${apiURL}/services/update/${this.id}`, this.service)
        .then(() => {
          this.resetForm()
          alert('Update has been saved.')
          this.$router.back()
        })
      }
    },
    resetForm() {
      // Reset the form data
      this.service.title = ''
      this.service.status = 'Active'
      this.serviceID = null
      // Reset the validation state
      this.v$.$reset()
    },
    cancelEditService() {
    // Reset the form
    this.resetForm()
    // Set isEditMode to false
    this.editserviceID = null
    this.isEditMode = false
    },
    async deleteService() {
      // Get the id of the service being deleted
      const serviceID = this.services[serviceID].id;
      axios.delete(`${apiURL}/services/${this.id}`).then(() => {
        alert('Service has been deleted.')
        this.$router.push({ name: 'servicelisteditor' })
      })
    },
    showSuccessMessage(message) {
      console.log('Success:', message)
    },
    showErrorMessage(message) {
      console.log('Error:', message)
    }
  }
}
</script>
<!-- form to create a new service -->
<template>
  <main>
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
        Create New Service
      </h1>
    </div>
    <div class="px-10 py-20">
      <!-- @submit.prevent stops the submit service from reloading the page-->
      <form @submit.prevent="isEditMode ? updateService() : handleSubmitForm()">
        <!-- grid container -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <h2 class="text-2xl font-bold">Service</h2>
          <!-- form field to fill out required service title -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Title</span>
              <span style="color: #ff0000">*</span>
              <input
                v-model="service.title"
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
          </div>
          <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Status</span>
            <select v-model="service.status" class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </label>
        </div>
      </div>
      <div class="flex justify-between mt-10 mr-20">
          <button class="bg-red-700 text-white rounded" type="submit" v-if="shouldShowAddButton">
            Add New Service
          </button>
      </div>
      <div class="mt-5 grid-cols-2" v-if="isEditMode">
          <button class="bg-red-700 text-white rounded" type="button" @click="updateService()">
            Update
          </button>
          <button class="bg-red-700 text-white rounded" type="button" @click="cancelEditService">
            Cancel
          </button>
      </div>
      </form>
    </div>
    <div>
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        List of Services
      </h1>
    </div>

    <hr class="mt-10 mb-10" />
    <!-- Display Found Data: Active services only -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
    >
      <div class="ml-10">
      </div>
      <div class="flex flex-col col-span-2">
        <table class="min-w-full shadow-md rounded">
          <thead class="bg-gray-50 text-xl">
            <tr>
              <th class="p-4 text-left">Title</th>
              <th class="p-4 text-left">Status</th>
              <th class="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-300">
            <tr
              @click="editService(service._id)"
              v-for="service in services"
              :key="service._id"
              class="cursor-pointer"
            >
              <td class="p-2 text-left">{{ service.title }}</td>
              <td class="p-2 text-left">{{ service.status }}</td>
              <!-- Actions column -->
              <td class="p-4 text-left">
                <button @click="editService(service._id)" class="mr-2">Edit</button>
                <button v-if="isEditMode" @click="deleteService()" class="mr-2">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>