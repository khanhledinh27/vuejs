<template>
    <div class="navbar_detail-video">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container">
                <router-link to="/" class="navbar-brand">
                    <img src="/src/assets/logo_plt.png" class="navbar-logo">
                </router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <router-link to="/" class="nav-link active" aria-current="page">Trang chủ</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/course" class="nav-link">Bài giảng</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/courselist" class="nav-link">Khóa học</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/contact" class="nav-link">Liên hệ</router-link>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    </div>

    <div class="total-infor_video">
        <div class="video-detail-page">
            <div class="page-video_detail">
                <iframe :src="getEmbedUrl(video.video_url)" title="Video Player" frameborder="0"
                    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                </iframe>
            </div>
            <div class="infor-video">
                <h5>{{ video.title }}</h5>
                <span>Thời gian đăng tải: {{ formatDate(video.created_at) }}</span>
                <p>{{ video.description }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'VideoDetailPage',
    data() {
        return {
            video: {}
        };
    },
    mounted() {
        this.getVideoDetails();
    },


    methods: {
        getVideoDetails() {
            // Lấy ID từ URL và gọi API
            axios.get(`${import.meta.env.VITE_API_URL}/api/lectures/${this.$route.params.id}`)
                .then(res => {
                    this.video = res.data.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        getEmbedUrl(url) {
            if (!url) return "";
            const videoId = this.extractYouTubeId(url);
            return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
        },
        extractYouTubeId(url) {
            const regExp = /(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/v\/|.*embed\/|.*youtu\.be\/|v=))([^&?\/]+)/;
            const match = url.match(regExp);
            return match && match[1] ? match[1] : null;
        },
        formatDate(dateString) {
            if (!dateString) return "N/A";
            const date = new Date(dateString);
            return date.toLocaleDateString("vi-VN"); // Hiển thị theo định dạng dd/mm/yyyy
        }
    }
};
</script>

<style scoped>
.total-infor_video {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.infor-video {
    margin-top: 15px;
    margin-bottom: 30px;
    padding: 5px;
    background-color: #0000000D;
    border-radius: 10px;
}

.page-video_detail iframe {
    width: 80vw;
    height: 70vh;
    border-radius: 10px;
}

.infor-video {
    justify-content: flex-start;
}
</style>