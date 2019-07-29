import { Component, OnInit, Input, ChangeDetectorRef, OnChanges, Output, EventEmitter } from '@angular/core';
import { BaseService } from '@app/common/services/base-service';

@Component({
  selector: 'sa-form-selects',
  templateUrl: './form-selects.component.html',
  styleUrls: ['./form-selects.component.css']
})
export class FormSelectsComponent implements OnInit, OnChanges {
  // 赋值
  @Input() defaultVal: any;
  // 唯一标识
  @Input() xmSelect: string;
  //id,name
  @Input() nameStr: string;
  //数据来源
  @Input() dataUrl: string;
  // 是否禁用
  @Input() isDisabled: boolean = true;
  // 返回已选择的值
  @Output() onSelected = new EventEmitter();
  // 可选值为空时
  @Output() onEnabled = new EventEmitter();
  //下拉列表
  areaIds: any = [];
  isNull: boolean = false;
  public formSelects: any;
  constructor(private baseService: BaseService, private cdr: ChangeDetectorRef) { }

  ngOnChanges() {
    this.getData(this.dataUrl);
  }
  ngOnInit() {
  }
  getData(dataUrl) {
    this.baseService.getList(dataUrl).subscribe(data => {
      this.areaIds = data.data;
      if (this.areaIds.length == 0) this.isNull = true;
      //脏检查，绑定数据到下拉框
      if (!this.cdr['destroyed']) {
        this.cdr.detectChanges();
      }
      //初始化多选框
      this.initSelects();
    });
  }

  /**
   * 初始化多选框
   */
  initSelects() {
    layui.use(['formSelects'], () => {
      let selectedValues = [];
      this.formSelects = layui.formSelects;
      //显示的刷新ui
      this.formSelects.render();
      // 选中事件
      this.formSelects.on(this.xmSelect, (id, vals, val, isAdd, isDisabled) => {
        vals.map(val => {
          selectedValues.push(val.value);
        });
        this.onSelected.emit(selectedValues);
      }, true);
      // 打开事件
      this.formSelects.opened(this.xmSelect, id => {
        if (this.isNull) {
          this.onEnabled.emit();
        }
      })
      // 设置选中值
      if (this.defaultVal) {
        this.formSelects.value(this.xmSelect, this.defaultVal);
      }
      // 设置禁用
      if (this.isDisabled) {
        this.formSelects.disabled(this.xmSelect);
      } else {
        this.formSelects.undisabled(this.xmSelect);
      }
    });
  }
}
