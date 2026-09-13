<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:html="http://www.w3.org/TR/REC-html40"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>XML Sitemap | BUYGOLD Investments</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style type="text/css">
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            background-color: #f8fafc;
            color: #1e293b;
            padding: 30px 20px;
            font-size: 14px;
            line-height: 1.5;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
            border: 1px solid #e2e8f0;
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #071b30 0%, #0f2b4c 100%);
            color: #ffffff;
            padding: 32px 36px;
            border-bottom: 3px solid #d97706;
          }
          .header-badge {
            display: inline-block;
            background: rgba(217, 119, 6, 0.2);
            color: #fbbf24;
            border: 1px solid rgba(251, 191, 36, 0.3);
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            padding: 4px 10px;
            border-radius: 6px;
            margin-bottom: 12px;
          }
          .header h1 {
            font-size: 26px;
            font-weight: 800;
            margin-bottom: 8px;
            letter-spacing: -0.5px;
          }
          .header p {
            color: #94a3b8;
            font-size: 14px;
            max-width: 750px;
          }
          .stats-bar {
            display: flex;
            gap: 24px;
            padding: 16px 36px;
            background: #f1f5f9;
            border-bottom: 1px solid #e2e8f0;
            font-size: 13px;
            color: #475569;
          }
          .stat-item strong {
            color: #0f172a;
            font-weight: 700;
          }
          .table-wrapper {
            overflow-x: auto;
            padding: 20px 36px 36px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
          }
          th {
            background: #f8fafc;
            color: #475569;
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            padding: 14px 16px;
            border-bottom: 2px solid #e2e8f0;
          }
          td {
            padding: 14px 16px;
            border-bottom: 1px solid #f1f5f9;
            vertical-align: middle;
            font-size: 13px;
          }
          tr:hover td {
            background-color: #f8fafc;
          }
          .url-link {
            color: #0284c7;
            text-decoration: none;
            font-weight: 600;
            word-break: break-all;
          }
          .url-link:hover {
            color: #0369a1;
            text-decoration: underline;
          }
          .priority-tag {
            display: inline-block;
            font-weight: 700;
            font-size: 11px;
            padding: 3px 8px;
            border-radius: 6px;
          }
          .priority-high {
            background: #dcfce7;
            color: #15803d;
          }
          .priority-med {
            background: #fef3c7;
            color: #b45309;
          }
          .priority-low {
            background: #f1f5f9;
            color: #64748b;
          }
          .freq-tag {
            color: #64748b;
            font-size: 12px;
            text-transform: capitalize;
          }
          .date-tag {
            color: #64748b;
            font-family: monospace;
            font-size: 12px;
          }
          .lang-badges {
            display: flex;
            gap: 4px;
            flex-wrap: wrap;
          }
          .lang-badge {
            background: #e2e8f0;
            color: #334155;
            font-size: 10px;
            font-weight: 700;
            padding: 2px 6px;
            border-radius: 4px;
            text-transform: uppercase;
          }
          .footer {
            padding: 16px 36px;
            background: #f8fafc;
            border-top: 1px solid #e2e8f0;
            color: #94a3b8;
            font-size: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .footer a {
            color: #d97706;
            text-decoration: none;
            font-weight: 600;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="header-badge">Google Search Console &amp; SEO Sitemap</div>
            <h1>BUYGOLD Multilingual XML Sitemap</h1>
            <p>This sitemap is automatically generated to assist Googlebot, Bing, and international search engines in discovering and indexing all localized pages, canonicals, and alternate hreflang language clusters for BUYGOLD (Al' Itihaad Investments Limited).</p>
          </div>
          <div class="stats-bar">
            <div class="stat-item">Total Indexed URLs: <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong></div>
            <div class="stat-item">Target Languages: <strong>6 (EN, AR, ZH, ES, RU, FR)</strong></div>
            <div class="stat-item">Canonical Domain: <strong>https://www.buygold.blog</strong></div>
          </div>
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th style="width: 45%;">URL Location</th>
                  <th style="width: 20%;">Multilingual Clusters</th>
                  <th style="width: 12%;">Last Modified</th>
                  <th style="width: 13%;">Change Frequency</th>
                  <th style="width: 10%;">Priority</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td>
                      <xsl:variable name="itemUrl" select="sitemap:loc"/>
                      <a class="url-link" href="{$itemUrl}" target="_blank">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td>
                      <div class="lang-badges">
                        <xsl:for-each select="xhtml:link">
                          <span class="lang-badge">
                            <xsl:value-of select="@hreflang"/>
                          </span>
                        </xsl:for-each>
                      </div>
                    </td>
                    <td>
                      <span class="date-tag">
                        <xsl:value-of select="sitemap:lastmod"/>
                      </span>
                    </td>
                    <td>
                      <span class="freq-tag">
                        <xsl:value-of select="sitemap:changefreq"/>
                      </span>
                    </td>
                    <td>
                      <xsl:variable name="p" select="sitemap:priority"/>
                      <xsl:choose>
                        <xsl:when test="$p &gt;= 0.9">
                          <span class="priority-tag priority-high"><xsl:value-of select="$p"/></span>
                        </xsl:when>
                        <xsl:when test="$p &gt;= 0.7">
                          <span class="priority-tag priority-med"><xsl:value-of select="$p"/></span>
                        </xsl:when>
                        <xsl:otherwise>
                          <span class="priority-tag priority-low"><xsl:value-of select="$p"/></span>
                        </xsl:otherwise>
                      </xsl:choose>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>
          <div class="footer">
            <span>BUYGOLD (Al' Itihaad Investments Limited) &#8212; Kampala, Uganda</span>
            <a href="https://www.buygold.blog/" target="_blank">Visit Main Website &#8594;</a>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
