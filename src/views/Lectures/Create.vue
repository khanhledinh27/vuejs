<template>
    <div>
        <div class="card">
            <div class="card-header">
                <h4>Add Lectures</h4>
            </div>
            <div class="card-body">
                <ul v-if="Object.keys(errorList).length > 0" class="alert alert-warning">
                    <li class="mb-0 ms-3" v-for="(error, index) in this.errorList" :key="index">
                        {{ error[0] }}
                    </li>
                </ul>
                <div class="mb-3">
                    <label for="">Title</label>
                    <input type="text" v-model="model.title" class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="">Description</label>
                    <input type="text" v-model="model.description" class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="">Source</label>
                    <input type="text" v-model="model.video_url" class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="">Category</label>
                    <input type="text" v-model="model.category" class="form-control" />
                </div>
                <div class="mb-3">
                    <button type="button" @click="saveLecture" class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';

export default {
    name: "lectureCreate",
    data() {
        return {
            errorList: '',
            model:{
                title: '',
                description: '',
                video_url: '',
                category: ''
            }
        }
    },
    methods: {
        saveLecture(){

            var mythis = this;

            axios.post(`${import.meta.env.VITE_API_URL}/api/lectures`, this.model).then(res => {
                console.log(res);
                alert(res.data.message);

                this.model = {
                    title: '',
                    description: '',
                    video_url: '',
                    category: ''
                }

                this.errorList = '';
                
            }).catch(function (error){
                if (error.response) {

                    if(error.response.status == 422){
                        mythis.errorList = error.response.data.errors;
                    }

                    //console.log(error.response.data);
                    //console.log(error.response.status);
                    //console.log(error.response.headers);
                } 
                else if (error.request) {
                    console.log(error.request);
                } 
                else {
                    console.log('Error', error.message);
                }
            });
        }
    }
}

</script>