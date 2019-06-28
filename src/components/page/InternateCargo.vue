<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-goods"></i> 国际散航发货运价</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- <div class="container"> -->
            <el-row :gutter="20">
                <el-col :span="14" :offset="1">
                    <el-card shadow="hover" class="mgb20" v-bind:class="{changeHeight: changeHeight}">
                        <div class="searchInfo">
                            <el-form ref="form" :model="form" :inline="true" label-width="130px" >
                                <el-form-item label="网点名称">
                                    <!-- <el-select v-model="form.value" filterable placeholder="请选择" @change="getdeptName()">
                                        <el-option v-for="item in options1" :key="item.deptId" :label="item.deptName" :value="item.deptCode">
                                            <span style="float: left">{{ item.deptCode }}</span>
                                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.deptName}}</span> 
                                        </el-option>
                                    </el-select> -->
                                    <el-input v-model="form.deptNameChange" placeholder="请选择" suffix-icon="el-icon-arrow-down" @focus="openDeptName()" class="input" ref="deptNameWrapper"></el-input>
                                </el-form-item> 

                                <div class="mask" v-show="tableShow1" @click="closeDeptName"></div> 
                                <div id="tableShowA" class="input" v-show="tableShow1" ref="tableShowDeptName">
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

                                <el-form-item label="日期">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" class="input"></el-date-picker>
                                </el-form-item>
                                
                                <el-form-item label="始发地">
                                    <el-select  v-model="form.distCode" filterable placeholder="请选择" @change="departCity()"  class="input">
                                        <el-option v-for="item in form.options3" :key="item.distCode" :label="item.distName" :value="item.distCode" class="input"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="目的地">
                                    <el-select  v-model="form.arriveCode" filterable placeholder="请选择" @change="arriveCity()" class="input">
                                        <el-option v-for="item in form.options4" :key="item.distCode" :label="item.distName" :value="item.distCode" class="input"></el-option>
                                    </el-select>
                                </el-form-item>
                               
                                <el-form-item label=" ">
                                    <el-collapse accordion @change="showHide">
                                        <el-collapse-item title="1111">
                                            <template slot="title" align="right">
                                                <el-button type="primary" plain >{{showText}}</el-button>
                                            </template>
                                            <el-form-item label="运力名称">
                                                <el-input v-model="form.dailyCapacityName" class="input"></el-input>
                                            </el-form-item>
                                            <el-form-item label="开始日期">
                                                <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" class="input"></el-date-picker>
                                            </el-form-item>
                                             <el-form-item label="结束日期">
                                                <el-date-picker type="date" placeholder="选择时间" v-model="form.date3" class="input"></el-date-picker>
                                             </el-form-item>
                                            <el-form-item label="审核状态" >
                                                <el-select  v-model="form.options5.checkStatus" filterable placeholder="请选择" class="input">
                                                    <el-option v-for="item in form.options5" :key="item.checkStatus" :label="item.reviewed" :value="item.checkStatus"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="交易类型">
                                                <el-select  v-model="form.options7.transactionType" filterable placeholder="请选择" class="input">
                                                    <el-option v-for="item in form.options7" :key="item.transactionType" :label="item.transactionTypeCn" :value="item.transactionType"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="订舱主运单">
                                                <el-input v-model="form.spaceMainNumber" class="input"></el-input>
                                            </el-form-item>
                                            <el-form-item label="合同ID">
                                                <el-input v-model="form.contractId" class="input"></el-input>
                                            </el-form-item>
                                            
                                            <el-form-item label="发货结算货物类型">
                                                <el-select  v-model="stowageTypeArr" collapse-tags multiple placeholder="请选择" @change="sendGoodsStowageType(val)" class="input">
                                                    <el-option v-for="item in form.options6" :key="item.value" :label="item.name" :value="item.value"></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-collapse-item>
                                    </el-collapse> 
                                </el-form-item>
                       
                            </el-form>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card shadow="hover" class="mgb20"  v-bind:class="{changeHeight: changeHeight}"> 
                        <el-row :gutter="10" style="padding-left: 7%;">
                            <el-col :span="6">
                                <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
                            </el-col>
                            <el-col :span="6">
                                <el-button type="primary" icon="el-icon-lx-faxianliulan" @click="seeDetailBtn">查看</el-button>
                            </el-col>
                            <el-col :span="6">
                                <el-button type="primary" icon="el-icon-lx-xinjian" @click="add">新增</el-button>
                            </el-col>
                            <el-col :span="6">
                                <el-button type="primary"  icon="el-icon-edit" @click="edit">修改</el-button>
                            </el-col>
                        </el-row>
                        <el-row :gutter="10"  style="margin-top:15px;padding-left: 7%;">
                            <el-col :span="6">
                                <el-button type="primary"  icon="el-icon-delete" @click="Delete">删除</el-button>
                            </el-col>
                            <el-col :span="6">
                                <el-button type="primary" icon="el-icon-lx-daoru" @click="Import">导入</el-button>
                            </el-col>
                            <el-col :span="6">
                                <el-button type="primary" icon="el-icon-lx-daochu1" @click="Export">导出</el-button>
                            </el-col>
                            <el-col :span="6">
                                <el-button type="primary"  icon="el-icon-lx-shenhe2" @click="audit">审核</el-button>
                            </el-col>
                        </el-row>
                    </el-card>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22" :offset="1">
                    <el-table :data="tableData" border class="table" ref="multipleTable" @select="handleSelectionChange" @row-dblclick="seeDetail">
                        <el-table-column type="selection" width="55" align="center"></el-table-column>
                        <el-table-column prop="contractId" label="合同ID" width="120" align="center"></el-table-column>
                        <el-table-column prop="checkStatus2Str" label="审核状态" width="120" align="center"></el-table-column>
                        <el-table-column prop="areaName" label="所属区" width="120" align="center"></el-table-column>
                        <el-table-column prop="deptCode" label="网点代码"  width="120" align="center"></el-table-column>
                        <el-table-column prop="departCityName" label="始发地" width="120" align="center"></el-table-column>
                        <el-table-column prop="arriveCityName" label="目的地" width="120" align="center"></el-table-column>
                        <el-table-column prop="capacityName" label="运力名称" :formatter="formatter" align="center"></el-table-column>
                        <el-table-column prop="supplierName" label="供应商名称" width="140" align="center"></el-table-column>
                        <el-table-column prop="supplierName2" label="供应商2名称" width="140" align="center"></el-table-column>
                        <el-table-column prop="supplierName3" label="供应商3名称" width="140" align="center"></el-table-column>
                        <el-table-column prop="goodsStowageType2Str" label="发货结算货物类型"  width="120" align="center"></el-table-column>
                        <el-table-column prop="transactionTypeStr" label="交易类型" width="120" align="center"></el-table-column>
                        <el-table-column prop="bookingWaybill" label="订舱主运单" width="120" align="center"></el-table-column>
                        <el-table-column prop="effectiveDate2Str" label="生效日期" sortable width="140" align="center"></el-table-column>
                        <el-table-column prop="expirationDate2Str" label="失效日期" sortable width="140" align="center"></el-table-column>
                        <el-table-column prop="supplierLowCharge" label="主供应商总最低收费" width="140" align="center"></el-table-column>
                        <el-table-column prop="supplierLowCharge2" label="供应商2总最低收费"  width="140" align="center"></el-table-column>
                        <el-table-column prop="supplierLowCharge3" label="供应商3总最低收费" width="140" align="center"></el-table-column>
                        <el-table-column prop="supplierCarryLogic2Str" label="主供应商总进位逻辑"  width="140" align="center"></el-table-column>
                        <el-table-column prop="supplierCarryLogic22Str" label="主供应商2总进位逻辑" width="140" align="center"></el-table-column>
                        <el-table-column prop="supplierCarryLogic23Str" label="主供应商3总进位逻辑"  width="140" align="center"></el-table-column>
                        <el-table-column prop="checkEmpCode" label="审核人" width="120" align="center"></el-table-column>
                        <el-table-column prop="checkTm" label="审核时间"  sortable width="140" align="center"></el-table-column>
                        <el-table-column prop="createdEmp" label="创建人" width="120" align="center"></el-table-column>
                        <el-table-column prop="createdTm" label="创建时间" sortable width="140" align="center"></el-table-column>
                        <el-table-column prop="modifiedEmp" label="修改人" width="120" align="center"></el-table-column>
                        <el-table-column prop="modifiedTm" label="修改时间" sortable width="140" align="center"></el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="6000">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        <!-- </div> -->

        <!-- 查看弹出框 -->
        <el-dialog title="查看" :visible.sync="lookVisible" width="55%">
            <el-form ref="lookForm" :model="entity" :inline="true" label-width="150px">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>基础信息</span>
                    </div>
                    <el-form-item label="运力名称" prop="capacityName">
                        <el-input v-model="entity.capacityName" class="input" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item label="主供应商名称" prop="supplierName">
                        <el-input v-model="entity.supplierName" class="input" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item label="主供应商名称2" prop="supplierName2">
                        <el-input v-model="entity.supplierName2" class="input" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item label="主供应商名称3" prop="supplierName3">
                        <el-input v-model="entity.supplierName3" class="input" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item label="发货结算货物类型" prop="goodsStowageType2Str">
                        <el-select  v-model="entity.goodsStowageType2Str" collapse-tags placeholder="请选择" @change="sendGoodsStowageType(val)" class="input" v-bind:disabled="disabled">
                            <el-option v-for="item in form.options6" :key="item.value" :label="item.name" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="主供应商总最低收费" prop="supplierLowCharge">
                        <el-input v-model="entity.supplierLowCharge"  class="input" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item label="主供应商2总最低收费" prop="supplierLowCharge2">
                        <el-input v-model="entity.supplierLowCharge2" class="input" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item label="主供应商3总最低收费" prop="supplierLowCharge3">
                        <el-input v-model="entity.supplierLowCharge3" class="input" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item label="生效日期" prop="effectiveDate2Str">
                        <el-input v-model="entity.effectiveDate2Str" class="input" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item label="主供应商总进位逻辑" prop="supplierCarryLogic2Str">
                        <el-input v-model="entity.supplierCarryLogic2Str" class="input" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item label="主供应商2总进位逻辑" prop="supplierCarryLogic22Str">
                        <el-input v-model="entity.supplierCarryLogic22Str" class="input" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item label="主供应商3总进位逻辑" prop="supplierCarryLogic23Str">
                        <el-input v-model="entity.supplierCarryLogic23Str" class="input" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item label="交易类型"  prop="transactionTypeStr">
                        <el-input v-model="entity.transactionTypeStr" class="input" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item label="订舱主运单" prop="bookingWaybill">
                        <el-input v-model="entity.bookingWaybill" class="input" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-card>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>费用项</span>
                    </div>
                    <div>
                        <el-collapse v-model="activeNames">
                        <el-collapse-item title="结算运价" name="1">
                            <div>
                                <el-form-item label="结算方式">
                                    <el-select  v-model="entity.carriageItems.isRange" collapse-tags placeholder="请选择" @change="sendGoodsStowageType(val)" class="input">
                                        <el-option v-for="item in form.carriage" :key="item.value" :label="item.name" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="计量单位">
                                    <el-input v-model="entity.carriageItems.meterUnitName" class="input"></el-input>
                                </el-form-item>
                                <el-form-item label="进位逻辑">
                                    <el-select  v-model="entity.carriageItems.carryLogic" collapse-tags placeholder="请选择" @change="sendGoodsStowageType(val)" class="input">
                                        <el-option v-for="item in form.carriage" :key="item.value" :label="item.name" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="最低收费">
                                    <el-input v-model="entity.carriageItems.lowCharge" class="input"></el-input>
                                </el-form-item>
                                <el-form-item label="单价">
                                    <el-input v-model="entity.carriageItems.price" class="input"></el-input>
                                </el-form-item>
                            </div>
                            <div>分段收费：</div>
                            <div>

                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="燃油费" name="2">
                            <el-form-item label="结算方式">
                                <el-select  v-model="entity.carriageItems.isRange" collapse-tags placeholder="请选择" @change="sendGoodsStowageType(val)" class="input">
                                    <el-option v-for="item in form.carriage" :key="item.value" :label="item.name" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="计量单位">
                                <el-input v-model="entity.carriageItems.meterUnitName" class="input"></el-input>
                            </el-form-item>
                            <el-form-item label="进位逻辑">
                                <el-select  v-model="entity.carriageItems.carryLogic" collapse-tags placeholder="请选择" @change="sendGoodsStowageType(val)" class="input">
                                    <el-option v-for="item in form.carriage" :key="item.value" :label="item.name" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="最低收费">
                                <el-input v-model="entity.carriageItems.lowCharge" class="input"></el-input>
                            </el-form-item>
                            <el-form-item label="单价">
                                <el-input v-model="entity.carriageItems.price" class="input"></el-input>
                            </el-form-item>
                        </el-collapse-item>
                        <el-collapse-item title="制单费" name="3">
                            <el-form-item label="结算方式">
                                <el-select  v-model="entity.carriageItems.isRange" collapse-tags placeholder="请选择" @change="sendGoodsStowageType(val)" class="input">
                                    <el-option v-for="item in form.carriage" :key="item.value" :label="item.name" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="计量单位">
                                <el-input v-model="entity.carriageItems.meterUnitName" class="input"></el-input>
                            </el-form-item>
                            <el-form-item label="进位逻辑">
                                <el-select  v-model="entity.carriageItems.carryLogic" collapse-tags placeholder="请选择" @change="sendGoodsStowageType(val)" class="input">
                                    <el-option v-for="item in form.carriage" :key="item.value" :label="item.name" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="最低收费">
                                <el-input v-model="entity.carriageItems.lowCharge" class="input"></el-input>
                            </el-form-item>
                            <el-form-item label="单价">
                                <el-input v-model="entity.carriageItems.price" class="input"></el-input>
                            </el-form-item>
                        </el-collapse-item>
                        <el-collapse-item title="战险费" name="4">
                           <el-form-item label="结算方式">
                                <el-select  v-model="entity.carriageItems.isRange" collapse-tags placeholder="请选择" @change="sendGoodsStowageType(val)" class="input">
                                    <el-option v-for="item in form.carriage" :key="item.value" :label="item.name" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="计量单位">
                                <el-input v-model="entity.carriageItems.meterUnitName" class="input"></el-input>
                            </el-form-item>
                            <el-form-item label="进位逻辑">
                                <el-select  v-model="entity.carriageItems.carryLogic" collapse-tags placeholder="请选择" @change="sendGoodsStowageType(val)" class="input">
                                    <el-option v-for="item in form.carriage" :key="item.value" :label="item.name" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="最低收费">
                                <el-input v-model="entity.carriageItems.lowCharge" class="input"></el-input>
                            </el-form-item>
                            <el-form-item label="单价">
                                <el-input v-model="entity.carriageItems.price" class="input"></el-input>
                            </el-form-item>
                        </el-collapse-item>
                        <el-collapse-item title="舱单费" name="5">
                           <el-form-item label="结算方式">
                                <el-select  v-model="entity.carriageItems.isRange" collapse-tags placeholder="请选择" @change="sendGoodsStowageType(val)" class="input">
                                    <el-option v-for="item in form.carriage" :key="item.value" :label="item.name" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="计量单位">
                                <el-input v-model="entity.carriageItems.meterUnitName" class="input"></el-input>
                            </el-form-item>
                            <el-form-item label="进位逻辑">
                                <el-select  v-model="entity.carriageItems.carryLogic" collapse-tags placeholder="请选择" @change="sendGoodsStowageType(val)" class="input">
                                    <el-option v-for="item in form.carriage" :key="item.value" :label="item.name" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="最低收费">
                                <el-input v-model="entity.carriageItems.lowCharge" class="input"></el-input>
                            </el-form-item>
                            <el-form-item label="单价">
                                <el-input v-model="entity.carriageItems.price" class="input"></el-input>
                            </el-form-item>
                        </el-collapse-item>
                        <el-collapse-item title="地面处理费" name="6">
                           <el-form-item label="结算方式">
                                <el-select  v-model="entity.carriageItems.isRange" collapse-tags placeholder="请选择" @change="sendGoodsStowageType(val)" class="input">
                                    <el-option v-for="item in form.carriage" :key="item.value" :label="item.name" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="计量单位">
                                <el-input v-model="entity.carriageItems.meterUnitName" class="input"></el-input>
                            </el-form-item>
                            <el-form-item label="进位逻辑">
                                <el-select  v-model="entity.carriageItems.carryLogic" collapse-tags placeholder="请选择" @change="sendGoodsStowageType(val)" class="input">
                                    <el-option v-for="item in form.carriage" :key="item.value" :label="item.name" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="最低收费">
                                <el-input v-model="entity.carriageItems.lowCharge" class="input"></el-input>
                            </el-form-item>
                            <el-form-item label="单价">
                                <el-input v-model="entity.carriageItems.price" class="input"></el-input>
                            </el-form-item>
                        </el-collapse-item>
                    </el-collapse>
                    </div>
                    
                </el-card>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="reset('lookForm')">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 新增弹出框 -->
        <el-dialog title="合同运力选择" :visible.sync="addVisible" width="55%">
            <el-form ref="addForm" :model="addForm" :inline="true" label-width="150px">
                <el-card class="box-card">
                    <el-form-item label="运力名称">
                        <el-input v-model="addForm.capacityName" class="input"></el-input>
                    </el-form-item>
                    <el-form-item label="合同ID">
                        <el-input v-model="addForm.contractId" class="input"></el-input>
                    </el-form-item>
                    <el-from-item>
                        <el-button @click="query">查询</el-button>
                    </el-from-item>
                    
                </el-card>
                <el-card>
                    <el-table :data="addTableData" border class="table" ref="multipleTable" @row-dblclick="handleEdit">
                        <el-table-column prop="contractId" label="合同ID" width="120" align="center"></el-table-column>
                        <el-table-column prop="departCityName" label="始发地" width="120" align="center"></el-table-column>
                        <el-table-column prop="arriveCityName" label="目的地" width="120" align="center"></el-table-column>
                        <el-table-column prop="capacityName" label="运力名称" :formatter="formatter" align="center"></el-table-column>
                        <el-table-column prop="supplierName" label="供应商名称" align="center"></el-table-column>
                        <el-table-column label="操作" width="180" align="center">
                            <template slot-scope="scope">
                                <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">新增一条</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination background @current-change="handleCurrentChangeAdd" layout="prev, pager, next" :total="6000">
                        </el-pagination>
                    </div>
                </el-card>
            </el-form>
           <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 导入 -->
        <el-dialog title="导入" :visible.sync="dialogImportVisible" :modal-append-to-body="false" :close-on-click-modal="false" class="dialog-import">
            <el-upload
                class="upload-demo"
                ref="upload"
                action="doUpload"
                :limit="1"
                :file-list="fileList"
                :before-upload="beforeUpload">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <a href="./static/moban.xlsx" rel="external nofollow" download="模板">
                        <el-button size="small" type="success">下载模板</el-button>
                    </a>
                    <div slot="tip" class="el-upload__tip">只能上传excel文件，且不超过5MB</div>
                    <div slot="tip" class="el-upload-list__item-name">{{fileName}}</div>
            </el-upload> 
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogImportVisible = false">取消</el-button>
                <el-button type="primary" @click="submitUpload()">确定</el-button>
                </span>
        </el-dialog>
        
        <!-- 审核弹出框 -->
        <el-dialog title="合同运力选择" :visible.sync="addVisible" width="55%">
            <el-form ref="addForm" :model="addForm" :inline="true" label-width="150px">
                <el-card>
                    <el-table :data="addTableData" border class="table" ref="multipleTable" @row-dblclick="handleEdit">
                        <el-table-column prop="contractId" label="合同ID" width="120" align="center"></el-table-column>
                        <el-table-column prop="departCityName" label="始发地" width="120" align="center"></el-table-column>
                        <el-table-column prop="arriveCityName" label="目的地" width="120" align="center"></el-table-column>
                        <el-table-column prop="capacityName" label="运力名称" :formatter="formatter" align="center"></el-table-column>
                        <el-table-column prop="supplierName" label="供应商名称" align="center"></el-table-column>
                        <el-table-column label="操作" width="180" align="center">
                            <template slot-scope="scope">
                                <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">新增一条</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination background @current-change="handleCurrentChangeAdd" layout="prev, pager, next" :total="6000">
                        </el-pagination>
                    </div>
                </el-card>
            </el-form>
           <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// import SelectTree from '@/components/widget/SelectTree.vue';
export default {
    components: {

    },
    data: function(){
        return {
            tableShow1: false,
            tableShow2: false,
            changeHeight: false,
            lookVisible: false,
            editVisible: false,
            disabled: true,
            addVisible: false,
            dialogImportVisible:false,
            showText: '展开',
            getDeptCode:'',
            tableData:[],
            addTableData:[],
            form:{
                date1: '',
                date2: '',
                date3: '',
                value:'',
                supplierCode:'',
                distCode:'',
                arriveCode:'',
                spaceMainNumber:'',//订舱主运单
                contractId:'',//合同ID
                dailyCapacityName:'',//运力名称
                checkStatus: '',
                options1:[],
                options2:[],
                options3:[],
                options4:[],
                options5:[
                    {
                        checkStatus: 'checkStatus1',
                        reviewed: '已审核'
                    },
                    {
                        checkStatus: 'checkStatus2',
                        reviewed: '未审核'
                    },
                ],
                options6:[
                    {
                        value: '0',
                        name: "所有选项"
                    },
                    {
                        value: '1',
                        name: "急件(舱位)"
                    },
                    {
                        value: '2',
                        name: "普货"
                    },
                    {
                        value: '3',
                        name: "即日件"
                    },
                    {
                        value: '4',
                        name: "鲜活"
                    },
                    {
                        value: '5',
                        name: "超大件"
                    },
                    {
                        value: '6',
                        name: "其它"
                    },
                    {
                        value: '7',
                        name: "医药"
                    },
                    {
                        value: '8',
                        name: "空舱销售-普货"
                    },
                    {
                        value: '9',
                        name: "包舱-大机型-普货"
                    },
                    {
                        value: '10',
                        name: "包舱-大机型-鲜活"
                    },
                    {
                        value: '11',
                        name: "包舱-小机型-普货"
                    },
                    {
                        value: '12',
                        name: "包舱-小机型-鲜活"
                    },
                    {
                        value: '13',
                        name: "悟空_普货"
                    },
                    {
                        value: '14',
                        name: "悟空_鲜活"
                    },
                    {
                        value: '15',
                        name: "悟空_生鲜"
                    },
                    {
                        value: '16',
                        name: "悟空_TA件"
                    },
                    {
                        value: '17',
                        name: "ABP海外特许加盟商"
                    },
                    {
                        value: '18',
                        name: "空舱销售-鲜活"
                    },
                ],
                options7:[
                    {
                    transactionType: 'transactionType1',
                    transactionTypeCn: '固定运价'
                    },
                    {
                        transactionType: 'transactionType2',
                        transactionTypeCn: '一票一议'
                    },
                ],
                deptNameChange:'',
                supplierChange:'',
            },
            cur_page1: 1,
            cur_page2: 1,
            cur_page3: 1,
            pageSize: 10,
            multipleSelection: [],
            singleSelection: {},
            stowageTypeArr:[],
            oldOptions :[],
            sTime:'',
            eTime:'',
            entity:{
                capacityName:'',
                supplierName:'',
                supplierName2:'',
                supplierName3:'',
                goodsStowageType:'',
                supplierLowCharge:'',
                supplierLowCharge2:'',
                supplierLowCharge3:'',
                effectiveDate:'',
                supplierCarryLogic:'',
                supplierCarryLogic2:'',
                supplierCarryLogic3:'',
                transactionType:'',
                spaceMainNumber:'',
                carriageItems:{
                    isRange:'',
                    meterUnitName:'',
                    carryLogic:'',
                    lowCharge:'',
                    price:'',
                }
            },
            activeNames: ['1'],
            addForm:{
                capacityName:'',
                contractId:''
            },
            // 导入
            multipleSelection: [],
            importUrl:'www.baidu.com',//后台接口config.admin_url+'rest/schedule/import/'
            importHeaders:{
                enctype:'multipart/form-data',
                cityCode:''
            },
            del_list:[],
            dialogImportVisible:false,
            name: 'import',
            fileList: [],
            withCredentials: true,
            processing: false,
            uploadTip:'点击上传',
            importFlag:1,
            errorResults:[]
        }
    },
    methods: {
        openDeptName(){
            this.tableShow1 = true;
            this.getdeptName(); 
        },
        closeDeptName(event){
            var show1 = document.querySelector("#tableShowA");   //返回匹配指定选择器的第一个元素
            if(show1){
                if(!show1.contains(event.target)){ // #tableShowA以外的区域
                    this.tableShow1 = false;
                }
            }
        },
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
        handleSelection1(val){
            this.getDeptCode = val.deptCode;
            this.form.deptNameChange = val.deptCode +' / '+ val.deptName;
            this.tableShow1 = false;
            this.supplierName(getDeptCode);
        },
        handleSelection2(val){
            var getSupplierName = val.getSupplierName;
            this.form.supplierChange = val.supplierCode +' / '+ val.supplierName;
            this.tableShow2 = false;
        },
        // 网点名称分页导航
        deptNameCurrentChange(val) {
            debugger
            this.cur_page1 = val;
            this.getdeptName();
        },
        // 供应商名称分页导航
        supplierCurrentChange(val) {
            this.cur_page2 = val;
            this.supplierName(getDeptCode);
        },
        //表格分页导航
        handleCurrentChange(val){
            this.cur_page3 = val;
            this.search();
        },
         handleCurrentChangeAdd(val){
            this.cur_page4 = val;
            this.getAddData();
        },
        formatter(row, column) {
            return row.capacityName;
        },
        showHide() {
            this.changeHeight = !this.changeHeight;
            if(this.changeHeight == true){
                this.showText = '收起'
            }else{
                this.showText = '展开'
            }
            
        },
        // 网点名称
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
            }).catch(()=>{
            })
        },
        //供应商名称
        supplierName: function(getDeptCode){
            this.$axios({
                method: 'post',
                url:'/air/supplierPool/querySupplierSimpleInfo.pvt',
                data: {
                    deptCode: getDeptCode
                },
            }).then((res)=>{
                var _this=this;
                if(res.data.datas.length > 0){
                    _this.options2 = res.data.datas;
                }else{
                    _this.$message.error(res.msg);
                }
            }).catch((err)=>{

            })
        },
        //始发地
        departCity: function(){
            this.$axios({
                method: 'post',
                url: '/air/district/findDistList.pub',
                // data: params,
            }).then((res)=>{
                console.log(res.data);
                var _this=this;
                if(res){
                    _this.options3 = res.data;
                }else{
                    _this.$message.error(res.msg);
                }
            }).catch(()=>{
            })
        },
        //目的地
        arriveCity: function(){
            this.$axios({
                method: 'post',
                url: '/air/district/findDistList.pub',
            }).then((res)=>{
                console.log(res.data);
                var _this=this;
                if(res){
                    _this.options4 = res.data;
                }else{
                    _this.$message.error(res.msg);
                }
            }).catch(()=>{
            })
        },
        
        //发货结算货物类型
        sendGoodsStowageType(val){
            // debugger
            // let allValues = [];
            // //保留所有值
            // for (let item of this.form.options6) {
            //     allValues.push(item.value)
            // }

            // // 用来储存上一次的值，可以进行对比
            // const oldVal = this.oldOptions.length === 1 ? [] : this.oldOptions

            // // 若是全部选择
            // if (val.includes('0')) this.stowageTypeArr = allValues

            // // 取消全部选中  上次有 当前没有 表示取消全选
            // if (oldVal.includes('0') && !val.includes('0')) this.stowageTypeArr = []

            // // 点击非全部选中  需要排除全部选中 以及 当前点击的选项 
            // // 新老数据都有全部选中 
            // if (oldVal.includes('0') && val.includes('0')) {
            //     const index = val.indexOf('0')
            //     val.splice(index, 1) // 排除全选选项
            //     this.stowageTypeArr = val
            // }

            // //全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
            // if (!oldVal.includes('0') && !val.includes('0')) {
            //     console.log(11)
            //     if (val.length === allValues.length - 1) this.stowageTypeArr = ['0'].concat(val)
            // }

            // //储存当前最后的结果 作为下次的老数据 
            // this.oldOptions[0] = this.stowageTypeArr

        },
        
        //查询
        search(){
            this.$axios.post('/data/index',{
                withCredentials:true,
                // method: 'post',
                // url:'/ais/sendCarriageShUn/list.arz',
                // data: {
                //     deptCodes: this.getDeptCode,
                //     supplierName: this.getSupplierName,
                //     startDate: this.form.date1,
                //     beginDate: this.form.date2,
                //     endDate: this.form.date3,
                //     departCityCode: this.form.distCode,
                //     arriveCityCode: this.form.arriveCode,
                //     dailyCapacityName: this.form.dailyCapacityName,
                //     checkStatus: this.form.options5.checkStatus,
                //     goodsStowageType: this.form.options7.transactionType,
                //     // goodsStowageTypes:,
                //     transactionType: this.form.spaceMainNumber,
                //     spaceMainNumber: this.form.spaceMainNumber,
                //     contractId: this.form.contractId
                // },
                // data: this.$refs.form.serializeJson(),
                // page: this.cur_page3,
            }).then((res) => {
                this.tableData = res.data.datas;
            })
        },
        handleSelectionChange(val,row){
            debugger
            this.multipleSelection = val;
            this.singleSelection = row;
        },
        //查看
        seeDetail(row){
            debugger
            this.lookVisible=true;
            this.entity=row;
            this.entity.carriageItems={};
        },
        seeDetailBtn(){
            debugger
            if(this.multipleSelection.length != 1){
                this.$message.warning(`请先选择一行`);
            }else{
                this.lookVisible=true;
                this.entity=this.singleSelection;
                this.entity.carriageItems={};
            }
        },
        //保存编辑
        saveEdit(){
            this.$message.success(`请先选择一行`);
        },
        getAddData(params){
            debugger
            this.$axios.post('/data2/index2',{
                withCredentials:true,
                params:params
            }).then((res) => {
                this.addTableData = res.data.datas2;
            })
        },
        //新增
        add(){
            if(this.getDeptCode == undefined || this.getDeptCode == ''){
                this.$message.warning(`先选择网点`);
            }else if(this.getDeptCode == '001'){
                this.$message.warning(`总部网点不能操作`);
            }else{
                this.addVisible=true;
                this.getAddData();
            }
        },
        query(){
            var params={
                capacityName: this.addForm.capacityName,
                contractId: this.addForm.contractId,
            };
            this.getAddData(params);
        },
        handleEdit(index, row){
            debugger
            this.lookVisible=true;
            this.entity=row;
            this.entity.carriageItems={};
            this.disabled=false;     
        },
        // 取消
        reset(value){
        //    this.$emit('reset');
           this.$refs[value].resetFields();//清空表单内容
           this.lookVisible = false;
       },
        // 修改
        edit(){
            if(this.tableData.length < 1){
                this.$message.warning(`请选择有效数据`);
            }else if(this.multipleSelection.length != 1){
                this.$message.warning(`只能操作一行有效数据`);
            }else{
                this.lookVisible=true;
                this.disabled=false;
                this.entity=this.singleSelection;
                this.entity.carriageItems={};
            }
        },
        // 导入
        Import(){
            this.dialogImportVisible = true;
        },
        beforeUpload(file){
            debugger
            console.log(file,'文件');
            this.files = file;
            const extension = file.name.split('.')[1] === 'xls'
            const extension2 = file.name.split('.')[1] === 'xlsx'
            const isLt2M = file.size / 1024 / 1024 < 5
            if (!extension && !extension2) {
            this.$message.warning('上传模板只能是 xls、xlsx格式!')
            return
            }
            if (!isLt2M) {
            this.$message.warning('上传模板大小不能超过 5MB!')
            return
            }
            this.fileName = file.name;
            return false // 返回false不会自动上传
        },
        submitUpload() {
            debugger
            console.log('上传'+this.files.name)
            if(this.fileName == ""){
                this.$message.warning('请选择要上传的文件！')
                return false
            }
            let fileFormData = new FormData();
            fileFormData.append('file', this.files, this.fileName);//filename是键，file是值，就是要传的文件，test.zip是要传的文件名
            let requestConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
            this.$axios.post(`/basedata/oesmembers/upload?companyId=`+this.company, fileFormData, requestConfig).then((res) => {
                debugger
                if (data && data.code == 200) {
                    this.$message({
                        message: '操作成功',
                        type: 'success',
                        duration: 1500,
                        onClose: () => {
                        this.visible = false
                        this.$emit('refreshDataList')
                        }
                    })
            } else {
                this.$message.error(data.msg)
            }
            }) 
        },
        // 导出
        Export(scheduleType){
            this.$axios.post('http://localhost:19090/exportUser',{
                data: {
                    "scheduleType": scheduleType
                },
                responseType: 'blob', //返回了一个Blob对象
            }).then((res)=>{
                debugger
                const link = document.createElement('a');
                // let blob = new Blob([res.data],{trpe: 'application/vnd.ms-excel'});
                let blob = new Blob([response.data], { type: 'application/x-xls' })
                link.style.display = "none";
                link.href = window.URL.createObjectURL(blob);
                link.download = fileNames[scheduleType] + '_' + response.headers.datestr + '.xls'
                link.click()
            }).catch((msg)=>{
                this.$message.error(data.msg)
            })
        },
        //删除
        Delete(){
            debugger
            const length = this.multipleSelection.length;
            if (length > 0 ) {
                for(var i=0;i<length;i++){
                    if (this.multipleSelection[i].contractId == 1) {
                        this.$message("只能删除草稿状态的数据");
                        return false;
                    }
                }
                this.$confirm('确定是否删除?', '提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(()=>{
                    debugger
                    
                    var ids=[];
                    this.multipleSelection.forEach((item)=>{
                        ids.push(item.contractId);
                    })
                    this.$axios.post('url',{
                        data: {
                            ids: ids.join(",")
                        },
                    }).then((res)=>{
                        this.$message({
                            type: 'success',
                            message: '删除成功!',
                        });
                        this.search();
                    })       
                }).catch(()=>{
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
                this.del_list = this.del_list.concat(this.multipleSelection);
                    this.multipleSelection = [];
            }
        },
        //审核
        audit(){
             
        }
    },
    computed: {
        data() {
            debugger
            return this.tableData.filter((d) => {
                debugger
                let is_del = false;
                for (let i = 0; i < this.del_list.length; i++) {
                    if (d.contractId === this.del_list[i].contractId) {
                        is_del = true;
                        break;
                    }
                }
                if (!is_del) {
                    if (d.areaName.indexOf(this.select_cate) > -1 &&
                        (d.contractId.indexOf(this.select_word) > -1 ||
                            d.areaName.indexOf(this.select_word) > -1)
                    ) {
                        return d;
                    }
                }
            })
        }
    },
    created(){
     
    },
    mounted(){
        this.getdeptName();     
        this.departCity();
        this.arriveCity();
        this.supplierName();
        this.sendGoodsStowageType();
    },
}
</script>

<style scoped>
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
    z-index: 999;
    border: 1px solid #81bcf8;
    border-radius: 10px;
}
#tableShowA{
    top: 60px;
    left: 230px;
}
#tableShowB{
    top: 60px;
    left: 520px;
}
.el-collapse{
    border:none;
}
.el-collapse-item__header.is-active{
    background-color: #409eff29;
}

.mgb20{
    height: 120px;
    z-index: 1200;
}
.changeHeight{
    height: 380px;
}
.input{
    width: 150px;
}
.box-card{
    margin-bottom: 15px;
}
.dialog-import{

}
.upload-demo{
    width: 360px;
    margin: 0 auto;
}

</style>