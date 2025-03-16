<script>
export default {
  name: "CoursesListPage",
  methods: {
    reloadPage(event) {
      event.preventDefault(); // Prevent default navigation
      window.location.reload(); // Reload the page
    }
  }
}
</script>