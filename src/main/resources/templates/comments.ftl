<#import "parts/common.ftl" as c>

<@c.page>
    <p>Comments: </p>

    <form action="/comments" method="post">
        <input type="text" name="text" >
        <input type="hidden" value="${documentId}" name="documentId">
        <input type="hidden" value="${_csrf.token}" name="_csrf">
        <button type="submit">Send</button>
    </form>

    <#list messages as message>
                <span>${message.getText()}</span>
                <p>${message.getAuthorName()}</p>
    <#else>
        No Comments
    </#list>
</@c.page>