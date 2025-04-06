<template>
    <div class="layout">
        <header class="header">
            <h1>Teacher Header</h1>
        </header>z
        <div class="main-container">
            <aside class="sidebar">
                <nav>
                    <ul>

                    </ul>
                </nav>
            </aside>
            <main class="content">
                <slot/>
            </main>
        </div>
    </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.header {
  background-color: #0D5A79;
  color: white;
  padding: 1rem;
  text-align: center;
}
.main-container {
  display: flex;
  flex: 1;
}
.sidebar {
  background-color: #F0F0F0;
  padding: 1rem;
  width: 250px;
}
.content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}
</style>