#!/bin/bash
# Generates sitemap.xml from all .html files in the project root
# Run this after making changes: bash generate-sitemap.sh

DOMAIN="https://cyass.co.za"
DATE=$(date +%Y-%m-%d)
SITEMAP="sitemap.xml"

cat > "$SITEMAP" <<HEADER
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
HEADER

# index.html gets highest priority
cat >> "$SITEMAP" <<EOF
  <url>
    <loc>${DOMAIN}/</loc>
    <lastmod>${DATE}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
EOF

# All other root-level .html files
for file in *.html; do
  [ "$file" = "index.html" ] && continue

  # Skip subdirectory copies (ss/ folder etc.)
  [ ! -f "$file" ] && continue

  # Assign priority based on page type
  case "$file" in
    pricing.html|how-it-works.html|get-the-app.html)
      priority="0.8"
      changefreq="weekly"
      ;;
    role-*.html|roles.html|agents.html|tenants.html)
      priority="0.7"
      changefreq="monthly"
      ;;
    faq.html|support.html)
      priority="0.6"
      changefreq="monthly"
      ;;
    privacy.html|terms.html)
      priority="0.3"
      changefreq="yearly"
      ;;
    *)
      priority="0.5"
      changefreq="monthly"
      ;;
  esac

  cat >> "$SITEMAP" <<EOF
  <url>
    <loc>${DOMAIN}/${file}</loc>
    <lastmod>${DATE}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>
EOF
done

echo "</urlset>" >> "$SITEMAP"
echo "Sitemap generated: $SITEMAP ($(grep -c '<url>' "$SITEMAP") URLs)"
