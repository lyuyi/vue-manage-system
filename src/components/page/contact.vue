<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breabcrumb-item><i class="el-icon-goods"></i>发提货合同</el-breabcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-card>
                <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
                <el-button type="primary" icon="el-icon-lx-xinjian" @click="append">新增</el-button>
                <el-button type="primary" icon="el-icon-lx-fuzhi" @click="copy">复制</el-button>
                <el-button type="primary" icon="el-icon-lx-faxianliulan" @click="seeDetail">查看明细</el-button>
                <el-button type="primary" icon="el-icon-lx-dengchu" @click="cancel">注销</el-button>
                <el-button type="primary" icon="el-icon-delete" @click="deleted">删除</el-button>
                <el-button type="primary" size="small" icon="el-icon-edit" @click="modifyAdmin">修改(ADMIN)</el-button>
                <el-button type="primary" icon="el-icon-download" @click="onExport">导出</el-button>
                <el-button type="primary" icon="el-icon-lx-shenhe2" @click="firstAudit">初审</el-button>
                <el-button type="primary" icon="el-icon-download" @click="onExportCapa">导出运力</el-button>
                <el-button type="primary" icon="el-icon-upload2" @click="importCapa">导入运力</el-button>
                <el-button type="primary" icon="el-icon-lx-shangchuan" @click="toSRM">传至SRM</el-button>
                <el-button type="primary" icon="el-icon-lx-BriefcaseFilled" @click="allVersion">所有版本</el-button>
                <el-button type="primary" icon="el-icon-lx-logs" @click="airRejectLog">AIR驳回日志</el-button>
            </el-card>
            <el-card>
                <el-form ref="form" :model="form" :inline="true" label-width="130px">
                    <el-form-item label="网点名称*">
                        <el-input v-model="form.deptNameChange" placeholder="请选择" suffix-icon="el-icon-arrow-down" @focus="openDeptName()" class="input"></el-input>
                    </el-form-item>
                    <div class="mask" v-show="tableShow1" @click="closeDeptName"></div> 
                    <div id="tableShowA" class="input" v-show="tableShow1">
                        <el-table :data="options1" stripe @row-click="handleSelection1"  height="300">
                            <el-table-column prop="deptCode" label="网点代码" width="110"></el-table-column>
                            <el-table-column prop="deptName" label="网点名称" width="110" ></el-table-column>
                        </el-table>
                        <div style="float:right">
                            <el-pagination background small pager-count="1" @current-change="deptNameCurrentChange" layout="prev, pager, next" :total="1000">
                            </el-pagination>
                        </div>  
                    </div> 

                     <el-form-item label="供应商名称">
                        <el-input v-model="form.supplierChange" placeholder="请选择" suffix-icon="el-icon-arrow-down" @focus="openSupplierName()" class="input"></el-input>
                    </el-form-item>

                   <div class="mask" v-show="tableShow2" @click="closeSupplierName"></div> 
                    <div id="tableShowB" class="input" v-show="tableShow2">
                        <el-table :data="options2" stripe @row-click="handleSelection2"  height="300">
                            <el-table-column prop="supplierCode" label="供应商代码" width="110"></el-table-column>
                            <el-table-column prop="supplierName" label="供应商名称" width="110" ></el-table-column>
                        </el-table>
                        <div style="float:right">
                            <el-pagination background small pager-count="1" @current-change="supplierCurrentChange" layout="prev, pager, next" :total="1000">
                            </el-pagination>
                        </div>  
                    </div>    
                    <el-form-item  label="合同开始日期">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" class="input"></el-date-picker>
                    </el-form-item>  
                     <el-form-item  label="合同结束日期">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" class="input"></el-date-picker>
                    </el-form-item>  
                    <el-form-item label="运力类型">
                        <el-select  v-model="form.dailyCapacityTypes.dailyCapacityType" filterable placeholder="请选择" class="input">
                            <el-option v-for="item in form.dailyCapacityTypes" :key="item.dailyCapacityType" :label="item.Capacity" :value="item.dailyCapacityType"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="合同名称">
                        <el-input v-model="form.contactName" placeholder="请选择" class="input"></el-input>
                    </el-form-item>
                    <el-form-item label="合同状态">
                        <el-select  v-model="form.contactStatus.contactState" filterable placeholder="请选择" class="input">
                            <el-option v-for="item in form.contactStatus" :key="item.contactState" :label="item.text" :value="item.contactState"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="合同类型">
                        <el-select  v-model="form.contactTypes.contactType" filterable placeholder="请选择" class="input">
                            <el-option v-for="item in form.contactTypes" :key="item.contactType" :label="item.text" :value="item.contactType"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="合同编号">
                        <el-input v-model="form.contactNumber" placeholder="请选择" class="input"></el-input>
                    </el-form-item>
                    <el-form-item label="ID">
                        <el-input v-model="form.ID" placeholder="请选择" class="input"></el-input>
                    </el-form-item>
                    <el-form-item label="SRM审核状态">
                        <el-select  v-model="form.contractSrmStates.contractSrmState" filterable placeholder="请选择" class="input">
                            <el-option v-for="item in form.contractSrmStates" :key="item.contractSrmState" :label="item.text" :value="item.contractSrmState"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="已上传影像">
                        <el-select  v-model="form.iscontractIsVideo.contractIsVideo" filterable placeholder="请选择" class="input">
                            <el-option v-for="item in form.iscontractIsVideo" :key="item.contractIsVideo" :label="item.text" :value="item.contractIsVideo"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="关联方式">
                        <el-select  v-model="form.correlateWays.correlateWay" filterable placeholder="请选择" class="input">
                            <el-option v-for="item in form.correlateWays" :key="item.correlateWay" :label="item.text" :value="item.correlateWay"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-card>
            <el-card>
                <el-row>
                    <el-col :span="24">
                        <el-table :data="addTableData" border class="table" ref="multipleTable" @select="handleSelectionChange" @row-dblclick="handleEdit">
                            <el-table-column type="selection" width="55" align="center"></el-table-column>
                            <el-table-column prop="contractId" label="ID" width="120" align="center"></el-table-column>
                            <el-table-column prop="effectiveDateStr" label="起草日期" width="120" align="center"></el-table-column>
                            <el-table-column prop="areaName" label="主供应商我司名称" width="120" align="center"></el-table-column>
                            <el-table-column prop="deptCode" label="主供应商公司代码"  width="120" align="center"></el-table-column>
                            <el-table-column prop="departCityName" label="主供应商" width="120" align="center"></el-table-column>
                            <el-table-column prop="arriveCityName" label="主供应商电子合同编码" width="120" align="center"></el-table-column>
                            <el-table-column prop="capacityName" label="主供应商费用项税码 " align="center"></el-table-column>
                            <el-table-column prop="supplierName" label="主供应商对账条件" width="140" align="center"></el-table-column>
                            <el-table-column prop="supplierName2" label="主供应商银行账号信息" width="140" align="center"></el-table-column>
                            <el-table-column prop="supplierName3" label="主供应商发票类型" width="140" align="center"></el-table-column>
                            <el-table-column prop="goodsStowageType2Str" label="主供应商付款条件"  width="120" align="center"></el-table-column>
                            <el-table-column prop="transactionTypeStr" label="主供应商付款方式 " width="120" align="center"></el-table-column>
                            <el-table-column prop="bookingWaybill" label="主供应商开票方式" width="120" align="center"></el-table-column>
                            <el-table-column prop="effectiveDate3Str" label="供应商2公司代码 " sortable width="140" align="center"></el-table-column>
                            <el-table-column prop="expirationDateStr" label="供应商2我司名称" sortable width="140" align="center"></el-table-column>
                            <el-table-column prop="checkEmpCode" label="供应商2" width="120" align="center"></el-table-column>
                            <el-table-column prop="checkTm" label="主供应商2电子合同编码"  sortable width="140" align="center"></el-table-column>
                            <el-table-column prop="createdEmp" label="供应商2费用项税码 " width="120" align="center"></el-table-column>
                            <el-table-column prop="createdTm" label="供应商2对账条件" sortable width="140" align="center"></el-table-column>
                            <el-table-column prop="modifiedEmp" label="供应商2银行账号信息" width="120" align="center"></el-table-column>
                            <el-table-column prop="modifiedTm" label="供应商2发票类型" sortable width="140" align="center"></el-table-column>
                            <el-table-column prop="supplierCarryLogic23Str" label="供应商2付款条件"  width="140" align="center"></el-table-column>
                            <el-table-column prop="checkEmpCode1" label="供应商2付款方式" width="120" align="center"></el-table-column>
                            <el-table-column prop="checkTm1" label="供应商2开票方式"  sortable width="140" align="center"></el-table-column>
                            <el-table-column prop="createdEmp1" label="供应商3公司代码 " width="120" align="center"></el-table-column>
                            <el-table-column prop="createdTm1" label="供应商3我司名称" sortable width="140" align="center"></el-table-column>
                            <el-table-column prop="checkEmpCode2" label="供应商3" width="120" align="center"></el-table-column>
                            <el-table-column prop="checkTm2" label="主供应商3电子合同编码"  sortable width="140" align="center"></el-table-column>
                            <el-table-column prop="createdEmp2" label="供应商3费用项税码 " width="120" align="center"></el-table-column>
                            <el-table-column prop="createdTm2" label="供应商3对账条件" sortable width="140" align="center"></el-table-column>
                            <el-table-column prop="modifiedEmp1" label="供应商3银行账号信息" width="120" align="center"></el-table-column>
                            <el-table-column prop="modifiedTm1" label="供应商3发票类型" sortable width="140" align="center"></el-table-column>
                            <el-table-column prop="supplierCarryLogic24Str" label="供应商3付款条件"  width="140" align="center"></el-table-column>
                            <el-table-column prop="checkEmpCode3" label="供应商3付款方式" width="120" align="center"></el-table-column>
                            <el-table-column prop="checkTm3" label="供应商3开票方式"  sortable width="140" align="center"></el-table-column>
                            <el-table-column prop="createdEmp3" label="合同名称" width="120" align="center"></el-table-column>
                            <el-table-column prop="createdTm3" label="运力类型" sortable width="140" align="center"></el-table-column>
                            <el-table-column prop="supplierLowCharge" label="合同类型" width="140" align="center"></el-table-column>
                            <el-table-column prop="supplierLowCharge2" label="操作模式"  width="140" align="center"></el-table-column>
                            <el-table-column prop="supplierLowCharge3" label="短驳属性" width="140" align="center"></el-table-column>
                            <el-table-column prop="supplierCarryLogic2Str" label="短驳供应商"  width="140" align="center"></el-table-column>
                            <el-table-column prop="supplierCarryLogic22Str" label="订舱供应商" width="140" align="center"></el-table-column>
                            <el-table-column prop="supplierCarryLogic25Str" label="主运单信息采集供应商"  width="140" align="center"></el-table-column>
                            <el-table-column prop="createdTm4" label="生效日期" sortable width="140" align="center"></el-table-column>
                            <el-table-column prop="effectiveDate2Str" label="失效日期" width="140" align="center"></el-table-column>
                            <el-table-column prop="expirationDate2Str" label="合同状态"  width="140" align="center"></el-table-column>
                            <el-table-column prop="supplierLowCharge4" label="折扣方式" width="140" align="center"></el-table-column>
                            <el-table-column prop="supplierCarryLogic1Str" label="折扣率"  width="140" align="center"></el-table-column>
                            <el-table-column prop="supplierCarryLogic24Str" label="货币" width="140" align="center"></el-table-column>
                            <el-table-column prop="supplierCarryLogic26Str" label="是否计抛"  width="140" align="center"></el-table-column>
                            <el-table-column prop="supplierLowCharge5" label="合同签订方" width="140" align="center"></el-table-column>
                            <el-table-column prop="supplierCarryLogic3Str" label="关联方式"  width="140" align="center"></el-table-column>
                            <el-table-column prop="supplierCarryLogic28Str" label="电子合同状态" width="140" align="center"></el-table-column>
                            <el-table-column prop="supplierCarryLogic27Str" label="ICS关联"  width="140" align="center"></el-table-column>
                        </el-table>
                        <div class="pagination">
                            <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="6000">
                        </el-pagination>
                    </div>
                    </el-col>
                </el-row>
            </el-card>
            <el-card>
                <el-row>
                    <el-form ref="capacityform" :model="capacityform" :inline="true" label-width="130px">
                        <el-button type="primary" icon="el-icon-lx-xinjian" @click="append">新增</el-button>
                        <el-button type="primary" icon="el-icon-delete" @click="deleted">删除</el-button>
                        <el-button type="primary" icon="el-icon-search" @click="search2">查询</el-button>
                        <el-button type="primary" icon="el-icon-lx-fuzhi" @click="copy">修改</el-button>
                        <el-button type="primary" icon="el-icon-lx-faxianliulan" @click="seeDetail">新增转板运力</el-button>
                        <el-form-item label="运力名称">
                            <el-input v-model="form.capacityName" class="input"></el-input>
                        </el-form-item>
                    </el-form>
                     <el-table :data="addTableData2" border class="table" ref="multipleTable" @row-dblclick="handleEdit">
                            <el-table-column type="selection" width="55" align="center"></el-table-column>
                            <el-table-column prop="areaName" label="运力名称" width="120" align="center"></el-table-column>
                            <el-table-column prop="deptCode" label="是否在用"  width="120" align="center"></el-table-column>
                            <el-table-column prop="departCityName" label="不退换地面处理费" width="120" align="center"></el-table-column>
                            <el-table-column prop="arriveCityName" label="收取退运服务费" width="120" align="center"></el-table-column>
                            <el-table-column prop="capacityName" label="拉货转运结算方式 " align="center"></el-table-column>
                            <el-table-column prop="supplierName" label="运价比率" width="140" align="center"></el-table-column>
                            <el-table-column prop="supplierName2" label="短驳属性" width="140" align="center"></el-table-column>
                            <el-table-column prop="supplierName3" label="创建人" width="140" align="center"></el-table-column>
                            <el-table-column prop="effectiveDateStr" label="创建时间" width="120" align="center"></el-table-column>
                        </el-table>
                </el-row>
            </el-card>
        </div>
        <!-- 新增弹出框 -->
        <el-dialog title="新增合同" :visible.sync="addVisible" width="60%">
            <el-row :gutter="20">
                <el-button type="primary" @click="saveContact">保存</el-button>
                <el-button type="primary" @click="submitCheck">提交审核</el-button>
                <el-button type="primary" @click="reset">重置</el-button>
            </el-row>
            <el-form v-model="addForm">
                <el-row  :gutter="20"  style="margin-top:20px">
                    <span style="color:red">当前合同状态{{contactStates}} ,  关联方式： {{interrelateWay}}，ICS/SRM审核状态：{{ICSSRMStateName}}</span>
                </el-row>
                <el-row :gutter="20"  style="margin-top:20px">
                    <el-card>
                        <div slot="header" class="clearfix">
                            <span>合同影像</span>
                        </div>
                        <el-button  type="primary">选择影像</el-button>
                    </el-card>
                </el-row>
                <el-row :gutter="20" style="margin-top:20px">
                    <el-card>
                        <div slot="header" class="clearfix">
                            <span>合同基本信息</span>
                        </div>
                            <el-row :gutter="20">
                                <el-col :span="8">
                                    <el-form-item label="网点名称">
                                        <el-input v-model="form.deptNameChange" placeholder="请选择" class="input"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="经营本部">
                                        <el-input v-model="form.hqName" placeholder="请选择" class="input"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="所属区域">
                                        <el-input v-model="form.areaName" placeholder="请选择" class="input"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="8">
                                    <el-form-item label="合同类型*">
                                        <el-select v-model="form.contactType" placeholder="请选择">
                                            <el-option v-for="item in contactTypes" :key="item.value" :label="item.lable" :value="item.value"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="货币*">
                                        <el-select v-model="form.curreny" placeholder="请选择">
                                            <el-option v-for="item in currenys" :key="item.value" :label="item.lable" :value="item.value"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="8">
                                    <el-form-item label="主供应商合同类型*">
                                        <el-select v-model="form.contractProtocolType" placeholder="请选择">
                                            <el-option v-for="item in contractProtocolTypes" :key="item.value" :label="item.lable" :value="item.value"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="主供应商2合同类型*">
                                        <el-select v-model="form.contractProtocolType2" placeholder="请选择">
                                            <el-option v-for="item in contractProtocolType2s" :key="item.value" :label="item.lable" :value="item.value"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="主供应商3合同类型*">
                                        <el-select v-model="form.contractProtocolType3" placeholder="请选择">
                                            <el-option v-for="item in contractProtocolType3s" :key="item.value" :label="item.lable" :value="item.value"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="8">
                                    <el-form-item label="主供应商电子合同">
                                        <el-select v-model="electCode"  placeholder="请选择">
                                            <el-option v-for="item in electronicContractNums" :key="item.electCode" :label="item.electCode" :value="item.electCode" :disabled="item.disabled">
                                                <span style="float: left;margin-right:20px">{{ item.electCode }}</span>
                                                <span style="float: left;margin-right:20px">{{ item.electName }}</span>
                                                <span style="float: left;margin-right:20px">{{ item.contStartTime}}</span>
                                                <span style="float: left;">{{ item.contEndTime }}</span>
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="供应商2电子合同">
                                        <el-input v-model="form.electronicContractNum2" placeholder="请选择" class="input"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="供应商3电子合同">
                                        <el-input v-model="form.electronicContractNum3" placeholder="请选择" class="input"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="8">
                                    <el-form-item label="主供应商历史版本">
                                        <el-button type="primary">点击查看</el-button>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="供应商2历史版本">
                                        <el-button type="primary">点击查看</el-button>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="供应商3历史版本">
                                        <el-button type="primary">点击查看</el-button>    
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="8">
                                    <el-form-item label="合同名称*">
                                        <el-input v-model="form.contactName" placeholder="请选择" class="input"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="合同约定履行期限*">
                                        <el-date-picker v-model="dateStart" type="date" placeholder="选择日期" style="width:150px"></el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="至*">
                                        <el-date-picker v-model="dateEnd" type="date" placeholder="选择日期" style="width:150px"></el-date-picker>   
                                    </el-form-item>
                                </el-col>
                            </el-row>
                    </el-card>
                </el-row>
                <el-row :gutter="20" style="margin-top:20px">
                    <el-card>
                        <div slot="header" class="clearfix">
                            <span>合同基本信息</span>
                        </div>
                            <el-row :gutter="20">
                                <el-col :span="8">
                                    <el-form-item label="主供应商我司名称*">
                                        <el-input v-model="form.compName" placeholder="请选择" class="input"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="供应商2我司名称">
                                        <el-input v-model="form.compName2" placeholder="请选择" class="input"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="供应商3我司名称">
                                        <el-input v-model="form.compName3" placeholder="请选择" class="input"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="8">
                                    <el-form-item label="主供应商*">
                                        <el-input v-model="form.mainSupplier" placeholder="请选择" class="input"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="供应商2">
                                        <el-input v-model="form.mainSupplier2" placeholder="请选择" class="input"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="供应商3">
                                        <el-input v-model="form.mainSupplier3" placeholder="请选择" class="input"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="8">
                                    <el-form-item label="主供应商对账条件*">
                                        <el-input v-model="form.reconciliationCondition" placeholder="请选择" class="input"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="供应商2对账条件">
                                        <el-input v-model="form.reconciliationCondition2" placeholder="请选择" class="input"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="供应商2对账条件">
                                        <el-input v-model="form.reconciliationCondition3" placeholder="请选择" class="input"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="8">
                                    <el-form-item label="折扣方式*">
                                        <el-input v-model="form.discountType" placeholder="请选择" class="input"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="折扣率">
                                        <el-input v-model="form.disountRate" placeholder="请选择" class="input"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="操作模式*">
                                        <el-input v-model="form.operatorSchema" placeholder="请选择" class="input"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="8">
                                    <el-form-item label="订舱供应商*">
                                        <el-input v-model="form.spaceSupplierCode" placeholder="请选择" class="input"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="主运单信息采集供应商*">
                                        <el-input v-model="form.mnSupplierCode" placeholder="请选择" class="input"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="短驳供应商">
                                        <el-input v-model="form.shortSupplier" placeholder="请选择" class="input"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="8">
                                    <el-form-item label="是否计抛*">
                                        <el-input v-model="form.isThrow" placeholder="请选择" class="input"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="短驳属性*">
                                        <el-input v-model="form.shortBarge" placeholder="请选择" class="input"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                    </el-card>
                </el-row>
            </el-form>
            
        </el-dialog>
        <!-- 注销弹出框 -->
        <el-dialog title="注销合同" :visible.sync="logoutVisible">
            <el-button @click="saveLogout">保存</el-button>
            <el-form :model="logoutForm" style="margin-top: 20px;">
               <el-row :gutter="20">
                   <el-col :span="24">
                        注销原因：<el-input clearable type="textarea" :rows="4" v-model="textarea"></el-input>
                   </el-col>
                </el-row>   
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import bus from '../common/bus';
import newContact from './newContact.vue';
export default {
  name: "contact",
  data () {
    return {
        newContact: false,
        tableShow1: false,
        tableShow2: false,
        logoutVisible:false,
        addVisible:false,
        form:{
            tableShow1: false,
            tableShow2: false,
            deptNameChange: '',
            supplierChange: '',
            date1: '',
            date2: '',
            dailyCapacityType: '',
            contactName: '',
            contactType: '',
            contactNumber: '',
            ID: '',
            contactState:'',
            contractSrmState: '',
            contractIsVideo: '',
            correlateWay: '',
            dailyCapacityTypes:[
                {
                    dailyCapacityType: 'dailyCapacityTypes0',
                    Capacity: '散航班',
                },
                {
                    dailyCapacityType: 'dailyCapacityTypes1',
                    Capacity: '全货机',
                },
            ],
            contactStatus:[
                {
                    contactState: 'contactState0',
                    text: '全部',
                },
                {
                    contactState: 'contactState1',
                    text: '起草',
                },
                {
                    contactState: 'contactState2',
                    text: '待初审',
                },
                {
                    contactState: 'contactState3',
                    text: '初审驳回',
                },
                {
                    contactState: 'contactState4',
                    text: '生效',
                },
                {
                    contactState: 'contactState5',
                    text: '注销',
                }
            ],
            contactTypes: [
                {
                    contactType: 'contactType0',
                    text: '全部',
                },{
                    contactType: 'contactType1',
                    text: '提货',
                },{
                    contactType: 'contactType2',
                    text: '发货',
                }
            ],
            contractSrmStates:[
                {
                    contractSrmState: 'contractSrmState0',
                    text: '未发送',
                },
                {
                    contractSrmState: 'contractSrmState1',
                    text: '已发送',
                },
                {
                    contractSrmState: 'contractSrmState2',
                    text: 'SMR已审核',
                },
                {
                    contractSrmState: 'contractSrmState3',
                    text: 'SMR驳回',
                }
            ],
            iscontractIsVideo:[
                {
                    contractIsVideo: 'contractIsVideo0',
                    text: '是',
                },
                {
                    contractIsVideo: 'contractIsVideo1',
                    text: '否',
                }
            ],
            correlateWays: [
                {
                    correlateWay: 'correlateWay0',
                    text: '含ICS',
                },
                {
                    correlateWay: 'correlateWay1',
                    text: '含SRM',
                }
            ]
        },
        tableData:[],
        addTableData: [],
        addTableData2: [],
        capacityform: {
            capacityName: '',
        },
        cur_page1: 1,
        cur_page2: 1,
        logoutForm:{
            textarea:''
        },
        addForm:{
            contactStates:'',
            interrelateWay:'',
            ICSSRMStateName:'',
            contactType:'',
            curreny:'',
            contractProtocolType:'',
            contractProtocolType2:'',
            contractProtocolType3:'',
            electronicContractNum:'',
            electronicContractNum2:'',
            electronicContractNum3:'',
            contactName:'',
            dateStart:'',
            dateEnd:'',
            compName:'',
            compName2:'',
            compName3:'',
            mainSupplier:'',
            mainSupplier2:'',
            mainSupplier3:'',
            reconciliationCondition:'',
            reconciliationCondition2:'',
            reconciliationCondition3:'',
            discountType:'',
            disountRate:'',
            operatorSchema:'',
            spaceSupplierCode:'',
            mnSupplierCode:'',
            shortSupplier:'',
            isThrow:'',
            shortBarge:'',

        },
        electronicContractNums:[
            {
                electCode: '电子合同编号',
                electName: '电子合同名称',
                contStartTime: '生效日期',
                contEndTime: '失效日期',
                disabled: true
            },
            {
                electCode: '001',
                electName: '华南',
                contStartTime: '2019-4-1',
                contEndTime: '2019-12-1'
            },
            {
                electCode: '002',
                electName: '华北',
                contStartTime: '2019-4-1',
                contEndTime: '2019-12-1'
            },
        ],
        electCode:'',
        multipleSelection: [],
        singleSelection:[],
    };
  },
  components: {newContact},
  methods:{
      //查询
       search(){
            this.$axios.post('/data/index',{
                // withCredentials:true,
                // params:params
            }).then((res) => {
                this.addTableData = res.data.datas;
            })
        },
        search2(){
            this.$axios.post('/data/index',{
            }).then((res) => {
                this.addTableData2 = res.data.datas;
            })
        },
        // //网点名称
        openDeptName(){
            this.tableShow1=true;
            this.getdeptName(); 
        },
        getdeptName: function(){
            var _this = this;
            let params= {
                source: 'SHIVA-TRTMS-AIR',
                operator: '10000',
                obj: {
                    deptCode:'',
                    pageNum: this.cur_page1,
                    pageSize: this.pageSize
                }
            };
            this.$axios({
                method: 'post',
                url: '/air-ais-base/department/findDeptsByUserAuth.pub',
                data:{ param:JSON.stringify(params)}

            }).then((res)=>{
                console.log(res.data.obj.list);
                var _this = this;
                if(res.data.obj.list.length > 0){
                    _this.options1 = res.data.obj.list;
                    _this.supplierName();
                }else{
                    _this.$message.error(res.msg);
                }
            }).catch(()=>{})
        },
        closeDeptName(event){
            var show1=document.querySelector("#tableShowA");
            if(show1){
                if(!show1.contains(event.target)){
                    this.tableShow1 = false;
                }
            }
        },
        handleSelection1(val){
            this.getDeptCode = val.deptCode;
            this.form.deptNameChange = val.deptCode +' / '+ val.deptName;
            this.tableShow1 = false;
            this.supplierName(getDeptCode);
        },
        deptNameCurrentChange(val) {
            this.cur_page1 = val;
            this.getdeptName();
        },
        //供应商名称
        openSupplierName(){
            this.tableShow2 = true;
            this.supplierName(getDeptCode);
        },
        closeSupplierName(event){
            var show2 = document.querySelector("#tableShowB");   
            if(show2){
                if(!show2.contains(event.target)){ // #tableShowB以外的区域
                    this.tableShow2 = false;
                }
            }
        },
        //勾选一行
        handleSelectionChange(val,row){
            
            this.multipleSelection=val;
            this.singleSelection=row;
        },
        //新增
        append(){
            // this.addVisible=true;
            this.$router.push('/newContact');
        },
        // 注销
        cancel(){
            if(this.multipleSelection.length<1){
                this.$message({
                    showClose: true,
                    message: '请先选择一条有效数据',
                    type: 'warning'
                });
                return false;
            }else if(this.multipleSelection.length>1){
               this.$message({
                    showClose: true,
                    message: '只能操作一条有效数据',
                    type: 'warning'
                }); 
                return false;
            }
            this.logoutVisible=true;
        }
  },
  mounted:function(){
    
  }
}
</script>
<style lang="" scoped>
.mask{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
    z-index: 1;
    opacity: 0;
}
#tableShowA,#tableShowB{
    display: block;
    width: 220px;
    position: absolute;
    z-index: 9999;
    border: 1px solid #81bcf8;
    border-radius: 10px;
}
#tableShowA{
    top: 233px;
    left: 192px;
}
#tableShowB{
    top: 233px;
    left: 488px;
}
.input{
    width: 150px;
}
.el-col{
    padding-bottom: 10px
}
</style>