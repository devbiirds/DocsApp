<#ftl >
<#import "parts/common.ftl" as c>
<#import "parts/loginparts.ftl" as l>
<@c.page>
    <div>
        <@l.logout />
        <span><a href="/user">User list</a></span>
    </div>
    <div>
        <form method="post" enctype="multipart/form-data">
            <input type="text" name="title" placeholder="Введите название документа :" />
            <input type="text" name="description" placeholder="Описание документа: ">
            <input type="file" name="file">
            <input type="hidden" name="_csrf" value="${_csrf.token}" />
            <button type="submit">Добавить</button>
        </form>
    </div>
    <div>Список документов</div>
    <form method="get" action="/main" >
        <input type="text" name="filter" value="{$filter?ifExists}" >
        <button type="submit">Найти</button>
    </form>
    <#list documents as document>
        <div>
            <b>${document.id}</b>
            <span>${document.title}</span>
            <i>${document.description}</i>
                <#if document.filename??>
                    <a href="/docs/${document.filename}" download>Скачать файл</a>
                </#if>
        </div>
    <#else>
        No documents
    </#list>
</@c.page>