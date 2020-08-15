//index page
$(document).ready(function() {
    var articleContainer = $(".article-container");
    
    $(document).on("click", ".btn.save", handleArticleSave);
    $(document).on("click", ".scrape-row", handleArticleScrape);

    initPage();

    function initPage() {
        articleContainer.empty();
        $.get("/api/articles?saved=false")
            .then(function(data) {
                if (data && data.length) {
                    renderArticles(data);
                }
                else {
                    renderEmpty();
                }
            });
    }
    function renderArticles(articles) {
        var articlePanels = [];
        for (var i = 0; i < articles.length; i++) {
            articlePanels.push(createPanel(articles[i]));
        }
        articleContainer.append(articlePanels);
    }

    function createPanel(article) {
        var panel = 
            $(["<div class='panel panel-default'>",
                "<div class='panel-heading'>",
                "<h3>",
                article.title,
                "<a class='btn btn-success save'>",
                "Save for Later",
                "</a>",
                "</h3>",
                "</div>",
                "<div class='panel-body'>",
                article.summary,
                "</div>",
                "</div>",
            ].join(""));
            panel.data("_id", article._id);

            return panel; 
    }

    function renderEmpty() {
        var emptyAlert = 
        $(["<div class='alert alert warning text-center>",
            "<h4>Sorry, nothing to see here.</h4>",
            "</div>",
            "<div class='panel panel-default'>",
            "<div class='panel-heading text-center'>",
            "<h3>Here are some other options for you:</h3>",
            "</div>",
            "<div class='panel-body text-center'>",
            "<h4><a class='scrape-new'>Scrape New Articles</a></h4>",
            "<h4><a href='/saved'>See Saved Articles</a></h4>",
            "</div>",
            "</div>"
        ].join(""));
        articleContainer.append(emptyAlert);
    }

    function handleArticleSave() {
        var articleToSave = $(this).parents(".panel").data();
        articleToSave.saved = true; 

        $.ajax({
            method: "PATCH",
            url: "/api/articles",
            data: articleToSave
        })
        .then(function(data) {
            if(data.ok) {
                initPage()
            }
        });
    }

    function handleArticleScrape() {
        $.get("/api/fetch")
            .then(function(data) {
                initPage();
                bootbox.alert("<h3 class='text-center m-top-80'>" + data.message + "</h3>");
            });
    }

 });