---
layout: layouts/blog.njk
title: Blog
metaDescription: A sample Blog page listing various posts and authors.
date: 2017-01-01
permalink: /
eleventyNavigation:
  key: Blog
  order: 2
---

<section>
  <h1>Latest Articles</h1>
  <ul>
    {% for post in collections.posts | reverse %}
      <li>
        <h2>
          <a href="{{ post.data.permalink | default: post.url }}">{{ post.data.title }}</a>
        </h2>
        <p>
          {% if post.data.summary %}
            {{ post.data.summary }}
          {% else %}
            {{ post.templateContent | striptags | truncate: 160, "..." }}
          {% endif %}
        </p>
        <p><small>{{ post.date | readableDate }}</small></p>
      </li>
    {% endfor %}
  </ul>
</section>
