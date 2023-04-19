<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'

export default {
  setup() {
    return { v$: useVuelidate({ $autoDirty: true }) }
  },
  data() {
    return {
      services: [],
      service: {
        title: '',
        status: 'Active' // Changed to a string for simplicity
      },
      editServiceId: null // Added for tracking the service being edited
    }
  },
  computed: {
    shouldShowAddButton() {
      // Return false if isEditMode is true, otherwise return true
      return this.editServiceId === null;
    },
    isEditMode() {
      return this.editServiceId !== null;
    }
  },
  methods: {
    async handleSubmitForm() {
      // Checks to see if there are any errors in validation
      const isFormCorrect = await this.v$.$validate()
      // If no errors found in validation, proceed with form submission
      if (isFormCorrect) {
        console.log('Form data:', this.service)
        // Add the created service to the services array
        this.services.push({...this.service})
        // Reset the form
        this.resetForm()
        // Show success message
        this.showSuccessMessage('Service has been added.')
      }
    },
    editService(serviceId) {
      // Set the service data to the form for editing
      const index = this.services.findIndex(service => service.id === serviceId);
      // If the serviceId is not found in the services array, return early
      if (index === -1) {
        console.error(`Service with id ${serviceId} not found in services array.`);
        return;
      }
      // Set the editServiceId data property to the index of the service being edited
      this.editServiceId = index;
      this.service.title = this.services[index].title;
      this.service.status = this.services[index].status;
    },
    handleUpdateForm() {
      // Updates the service in the services array
      if (this.editServiceId !== null) {
        const editedService = { ...this.service };
        this.services.splice(this.editServiceId, 1, editedService);
        // Reset the form
        this.resetForm()
        // Show success message
        this.showSuccessMessage('Service has been updated.')
        this.editServiceId = null
      }
    },
    resetForm() {
      // Reset the form data
      this.service.title = ''
      this.service.status = 'Active'
      this.serviceId = null
      // Reset the validation state
      this.v$.$reset()
    },
    cancelEditService() {
    // Reset the form
    this.resetForm()
    // Set isEditMode to false
    this.editServiceId = null
    this.isEditMode = false
    },
    deleteService(index) {
      // Get the id of the service being deleted
      const serviceId = this.services[index].id;
      const serviceIndex = this.services.findIndex(service => service.id === serviceId);
      // Remove the service from the services array
      this.services.splice(serviceIndex, 1);
      // Reset the form
      this.resetForm()
      // Show success message
      this.showSuccessMessage('Service has been deleted.')
      }
    },
    showSuccessMessage(message) {
      console.log('Success:', message)
    },
    showErrorMessage(message) {
      console.log('Error:', message)
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
      <form @submit.prevent="isEditMode ? handleUpdateForm() : handleSubmitForm()">
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
          <button class="bg-red-700 text-white rounded" type="button" @click="handleUpdateForm()">
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
            >
              <td class="p-2 text-left">{{ service.title }}</td>
              <td class="p-2 text-left">{{ service.status }}</td>
              <!-- Actions column -->
              <td class="p-4 text-left">
                <button @click="editService(service._id)" class="mr-2">Edit</button>
                <button v-if="isEditMode" @click="deleteService(editServiceId)" class="mr-2">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>