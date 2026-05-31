import re

with open("src/app/page.tsx", "r") as f:
    c = f.read()

# Scale down headers
c = c.replace("text-5xl md:text-9xl", "text-4xl md:text-7xl")
c = c.replace("text-2xl md:text-4xl", "text-xl md:text-3xl")
c = c.replace("text-5xl md:text-7xl", "text-4xl md:text-5xl")
c = c.replace("text-4xl md:text-7xl", "text-3xl md:text-5xl")
c = c.replace("text-5xl md:text-6xl", "text-3xl md:text-5xl")
c = c.replace("text-4xl md:text-6xl", "text-3xl md:text-5xl")
c = c.replace("text-3xl md:text-5xl", "text-2xl md:text-4xl")

# Scale down paragraph text
c = c.replace("text-xl leading-loose", "text-base md:text-lg leading-loose")
c = c.replace("text-xl md:text-2xl", "text-lg md:text-xl")
c = c.replace("text-lg leading-loose", "text-base leading-loose")

# Scale down container max widths
c = c.replace("max-w-7xl", "max-w-5xl")
c = c.replace("max-w-4xl", "max-w-3xl")

# Footer giant text
c = c.replace("text-7xl md:text-[14rem]", "text-6xl md:text-[9rem]")

with open("src/app/page.tsx", "w") as f:
    f.write(c)
