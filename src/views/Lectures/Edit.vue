<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Edit Lectures</h4>
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
                    <button type="button" @click="updateLecture" class="btn btn-primary">Update</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';

export default {
    name: "lectureEdit",
    data() {
        return {
            lectureId: '',
            errorList: '',
            model:{
                title: '',
                description: '',
                video_url: '',
                category: ''
            }
        }
    },
    mounted(){
        //console.log(this.$route.params.id);
        this.lectureId = this.$route.params.id;
        this.getLectureData(this.$route.params.id);
    },
    methods: {
        
        getLectureData(lectureId){
            axios.get(`${import.meta.env.VITE_API_URL}/api/lectures/${lectureId}/edit`).then(res => {
                console.log(res.data.data);

                this.model = res.data.data;
            }).catch(function (error){
                if (error.response) {

                    if(error.response.status == 404){ 
                        alert(error.response.data.message);
                    }
                }
            });
        },
        updateLecture(){

            var mythis = this;

            axios.put(`${import.meta.env.VITE_API_URL}/api/lectures/${this.lectureId}/edit`, this.model).then(res => {
                console.log(res);
                alert(res.data.message);
                this.errorList = '';
                
            }).catch(function (error){
                if (error.response) {

                    if(error.response.status == 422){
                        mythis.errorList = error.response.data.errors;
                    }
                    if(error.response.status == 404){ 
                        alert(error.response.data.message);
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