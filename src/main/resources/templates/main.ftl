<#ftl >
<#import "parts/common.ftl" as c>
<#import "parts/loginparts.ftl" as l>
<@c.page>
    <div>
        <@l.logout />
        <span><a href="/user">User list</a></span>
    </div>
    <div>
        <form method="post" >
            <input type="text" name="title" placeholder="������� �������� ��������� :" />
            <input type="text" name="description" placeholder="�������� ���������: ">
            <input type="hidden" name="_csrf" value="${_csrf.token}" />
            <button type="submit">��������</button>
        </form>
    </div>
    <div>������ ����������</div>
    <form method="get" action="/main" >
        <input type="text" name="filter" >
        <button type="submit">�����</button>
    </form>
    <#list documents as document>
        <div>
            <b>${document.id}</b>
            <span>${document.title}</span>
            <i>${document.description}</i>
            <!--
            in this tag we should add info with file .docx
            <strong>File(in future)</strong>
            -->
        </div>
    <#else>
        No documents
    </#list>
</@c.page>