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
            <input type="text" name="title" placeholder="������� �������� ��������� :" />
            <input type="text" name="description" placeholder="�������� ���������: ">
            <input type="file" name="file">
            <input type="hidden" name="_csrf" value="${_csrf.token}" />
            <button type="submit">��������</button>
        </form>
    </div>
    <div>������ ����������</div>
    <form method="get" action="/main" >
        <input type="text" name="filter" value="{$filter?ifExists}" >
        <button type="submit">�����</button>
    </form>
    <#list documents as document>
        <div>
            <b>${document.id}</b>
            <span>${document.title}</span>
            <i>${document.description}</i>
                <#if document.filename??>
                    <a href="/docs/${document.filename}" download>������� ����</a>
                </#if>
        </div>
    <#else>
        No documents
    </#list>
</@c.page>