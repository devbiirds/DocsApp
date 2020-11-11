<#ftl >
<#import "parts/common.ftl" as c>
<#import "parts/loginparts.ftl" as l>
<#include "parts/security.ftl">
<@c.page>
    <#if isAdmin>
    <div>
        <a class="btn btn-primary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
            Add new Message
        </a>
        <div class="collapse" id="collapseExample">
            <div class="form-group mt-3">
                <form method="post" enctype="multipart/form-data">
                    <div class="form-group">
                        <input type="text" class="form-control" name="title" placeholder="������� �������� ���������" />
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" name="description" placeholder="������� �������� ���������">
                    </div>
                    <div class="form-group">
                        <div class="custom-file">
                            <input type="file" name="file" id="customFile">
                            <label class="custom-file-label" for="customFile">Choose file</label>
                        </div>
                    </div>
                    <input type="hidden" name="_csrf" value="${_csrf.token}" />
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary">��������</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </#if>
    <div>������ ����������</div>
    <div class="form-row">
        <div class="form-group col-md-6">
            <form method="get" action="/main" class="form-inline">
                <input type="text" name="filter" class="form-control" value="${filter?ifExists}" placeholder="Search by tag">
                <button type="submit" class="btn btn-primary ml-2">Search</button>
            </form>
        </div>
    </div>

        <div class="card-columns">
            <#list documents as document>
                <div class="card my-3">
                    <#if document.filename??>
                        <a href="/docs/${document.filename}" download>������� ����</a>
                    </#if>
                    <div class="m-2">
                        <span>${document.title}</span>

                    </div>
                    <div class="m-2">
                        <p>${document.description}</p>
                    </div>
                    <div class="m-2">
                        <a href="/comments/${document.id}">�����������</a>
                    </div>

                </div>
            <#else>
                No Documents
            </#list>
        </div>
</@c.page>