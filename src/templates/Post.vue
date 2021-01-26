<template>
    <Layout>
        some stuff
        <h1>{{$page.post.title}}</h1>
        {{$page.post.content}}
    </Layout>
</template>
<page-query>
    query Post ($path: String!){
        post: post (path: $path) {
            title
            content
        }
    }
</page-query>