<#import "parts/common.ftl" as c>

<@c.page>
    <h1>Comments: </h1>

    <form action="/comments" method="post" >
        <input class="form-control" type="text" name="text" >
        <input id="number" type="number" min="1" max="5" value="4" name="number">
        <input type="hidden" value="${documentId}" name="documentId">
        <input type="hidden" value="${_csrf.token}" name="_csrf">
        <button type="submit" class="btn btn-success">Send</button>
    </form>

    <#list messages as message>
        <div class="card">
            <div class="card-body">
                <span>${message.getText()}</span>
                <p>${message.getAuthorName()}</p>
            </div>
        </div>

    <#else>
        No Comments
    </#list>
</@c.page>