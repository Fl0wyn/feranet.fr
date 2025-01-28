---
title: Tools
sidebar: false
footer: false
next: false
---

# {{ $frontmatter.title }} <Badge type="tip" :text="itemCount" style="margin-left: 0.2rem" />

<script setup>
import Tools from './components/Tools.vue'
import { data } from "./data";

const itemCount = data.reduce(
  (count, category) => count + category.items.length,
  0
);
</script>

<Tools />
