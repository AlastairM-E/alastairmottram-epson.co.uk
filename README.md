# alastairmottram-epson.co.uk - performance site

## Purpose

- Make a site more performant than old Gatsby.js static site

## Results

- 0.5 seconds faster by migrating to HTML, Tailwindcss & vanilla Typescript site by site from 541KB to 23KB.

Check out [current site results](https://www.webpagetest.org/result/220310_AiDcRG_C2X/) and [old site results](https://www.webpagetest.org/result/220227_AiDcVW_7J4/).

|                     | Current site (HTML, Tailwindcss, Typescript) | old site (Gatsby.js, Typescript) |
| :------------------ | :------------------------------------------- | :------------------------------- |
| First load          | 1.2s                                         | 1.7s                             |
| Total blocking time | 0.482s                                       | 1.4s                             |
| App size            | 351KB                                        | 541KB                            |
