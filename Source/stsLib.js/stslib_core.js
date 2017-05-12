﻿/*----------------------------------------
stsLib.js
Standard Software Library JavaScript
----------------------------------------
ModuleName:     Core Module
FileName:       stslib_core.js
----------------------------------------
License:        MIT License
All Right Reserved:
    Name:       Standard Software
    URL:        https://www.facebook.com/stndardsoftware/
--------------------------------------
Version:        2017/04/30
//----------------------------------------*/

//----------------------------------------
//■グローバル
//----------------------------------------
'use strict';

//----------------------------------------
//・alert
//----------------------------------------
//  ・ライブラリ内部で alert を使うので
//    alert がない環境(node.jsとか)での動作の時に
//    エラーにならないように定義する
//----------------------------------------
var alert = alert || function(message) {
  console.log(message);
}

//----------------------------------------
//・Array.isArray
//----------------------------------------
//  ・Array.isArray が存在しない環境(WSHとか)のため
//----------------------------------------
Array.isArray = Array.isArray || function(arg) {
  return Object.prototype.toString.call(arg) === '[object Array]';
};
//参考:書籍:JavaScriptパターン P51

//----------------------------------------
//■ライブラリ名前空間
//----------------------------------------
//  ・名前空間は同じ書き方で別ファイルで
//    定義し直しても別関数を定義していくことができる
//----------------------------------------
var stsLib = stsLib || {};
(function (global) {
  var _ = stsLib;

  //----------------------------------------
  //◆デバッグ処理
  //----------------------------------------
  _.debug = stsLib.debug || {};
  (function () {
    var _ = stsLib.debug;

    //----------------------------------------
    //・assert関数
    //----------------------------------------
    //  ・  value が true でなければ
    //      例外を出力する関数
    //  ・  他言語でよく使う
    //----------------------------------------
    _.assert = function(value, message) {
      var t = stsLib.type;
      if (t.isNullOrUndefined(message)) {
        message = '';
      }
      if (!t.isBoolean(value)) {
        throw new Error('Error:' + message);
      }
      if (!value) {
        throw new Error('Error:' + message);
      }
    }

    //----------------------------------------
    //・check関数
    //----------------------------------------
    //  ・  2値が一致するかどうか確認する関数
    //----------------------------------------
    _.check = function(a, b, message) {
      if (a === b) {
        return true;
      }
      if (stsLib.type.isNullOrUndefined(message)) {
        message = '';
      } else {
        message = 'Test:' + message + "\n";
      }
      message = message +
          "A != B" + "\n" +
          "A = " + a + "\n" +
          "B = " + b;
      alert(message);
      return false;
    }

    _.test_check = function() {
      var d = stsLib.debug;
      d.check(true, "123" === "123");
      d.check(true, " 123" == 123);
      d.check(false, " 123" === 123);
    }
  }());

  //----------------------------------------
  //◆条件判断
  //----------------------------------------

  //----------------------------------------
  //◆型処理
  //----------------------------------------
  _.type = stsLib.type || {};
  (function () {
    var _ = stsLib.type;

    _.isUndefined = function(value) {
      return (typeof value === 'undefined')
    }

    _.isNull = function(value) {
      return (value === null);
    }

    _.isNullOrUndefined = function(value)
    {
      return (_.isNull(value) 
        || _.isUndefined(value));
    }

    _.test_isNullOrUndefined = function() {
      var d = stsLib.debug;
      var a1;
      d.check(true,   _.isUndefined(a1));
      d.check(false,  _.isNull(a1));
      d.check(true,   _.isNullOrUndefined(a1));

      var a2 = null;
      d.check(false,  _.isUndefined(a2));
      d.check(true,   _.isNull(a2));
      d.check(true,   _.isNullOrUndefined(a2));

      var a3 = 10;
      d.check(false,  _.isUndefined(a3));
      d.check(false,  _.isNull(a3));
      d.check(false,  _.isNullOrUndefined(a3));
    }

    _.isBoolean = function(value) {
      return (typeof value === 'boolean')
    }

    _.test_isBoolean = function() {
      var d = stsLib.debug;
      var st = stsLib.type;
      d.check(true, st.isBoolean(true));
      d.check(true, st.isBoolean(false));
      d.check(false,st.isBoolean(undefined));
      d.check(false,st.isBoolean(null));
      d.check(false,st.isBoolean(''));
      d.check(false,st.isBoolean('true'));
      d.check(false,st.isBoolean('false'));
      d.check(false,st.isBoolean(123));
      d.check(false,st.isBoolean(0));
      d.check(false,st.isBoolean(-1));
    }

    _.isNumber = function(value) {
      return (typeof value === 'number');
    }

    _.test_isNumber = function() {
      var d = stsLib.debug;
      var st = stsLib.type;
      d.check(true, st.isNumber(123));
      d.check(true, st.isNumber(0));
      d.check(true, st.isNumber(-1));
      d.check(true ,st.isNumber(123.4));
      d.check(true, st.isNumber(123.0));
      d.check(false,st.isNumber(true));
      d.check(false,st.isNumber(false));
      d.check(false,st.isNumber(null));
      d.check(false,st.isNumber(undefined));
      d.check(false,st.isNumber(''));
      d.check(false,st.isNumber('ABC'));
      d.check(false,st.isNumber('ABC10'));
      d.check(false,st.isNumber('10ABC'));
      d.check(false,st.isNumber('0ABC'));
      d.check(false,st.isNumber('0'));
      d.check(false,st.isNumber('5'));
      d.check(false,st.isNumber('-5'));
      d.check(false,st.isNumber('100'));
      d.check(false,st.isNumber('-100'));
      d.check(false,st.isNumber([]));
      d.check(false,st.isNumber({}));
    }

    _.isInt = function(value) {
      if (!_.isNumber(value)) {
        return false;
      }
      return Math.round(value) === value;
    }

    _.test_isInt = function() {
      var d = stsLib.debug;
      var st = stsLib.type;
      d.check(true, st.isInt(123));
      d.check(true, st.isInt(0));
      d.check(true, st.isInt(-1));
      d.check(false,st.isInt(123.4));
      d.check(true, st.isInt(123.0)); //どうやってもintじゃない！と判定できない
      d.check(false,st.isInt(true));
      d.check(false,st.isInt(false));
      d.check(false,st.isInt(null));
      d.check(false,st.isInt(undefined));
      d.check(false,st.isInt(''));
      d.check(false,st.isInt('ABC'));
      d.check(false,st.isInt('0'));
      d.check(false,st.isInt('5'));
      d.check(false,st.isInt('-5'));
      d.check(false,st.isInt('100'));
      d.check(false,st.isInt('-100'));
      d.check(false,st.isInt([]));
      d.check(false,st.isInt({}));
    }

    _.isString = function(value) {
      return (typeof value === 'string');
    }

    //----------------------------------------
    //・配列確認
    //----------------------------------------
    _.isArray = function(value) {
      return Object.prototype.toString.call(value) === '[object Array]';
    }
  }());


  //----------------------------------------
  //◆数値
  //----------------------------------------

  //----------------------------------------
  //◆角度
  //----------------------------------------

  //----------------------------------------
  //◆配列処理
  //----------------------------------------

  //----------------------------------------
  //◆文字列処理
  //----------------------------------------

  //文字列処理、名前空間
  _.string = stsLib.string || {};
  (function () {
    var _ = stsLib.string;

/*----------------------------------------
//・外部からの呼び出し時は2通りのやり方ができる

  var d = stsLib.debug;

  //・静的関数的な使い方
  //  先頭小文字の string を使う
  d.check(true, stsLib.string.isInclude('abc', 'a'));

  //・拡張メソッド的な使い方
  //  先頭大文字の String を使う
  var str1 = new stsLib.String('abc');
  d.check(true, str1.isInclude('a'));

  //・拡張メソッド的な使い方
  //  newしなくても使用できる
  var str2 = stsLib.String('abc');
  d.check(true, str2.isInclude('a'));

//・名前空間は何度宣言してもよいので、
//  別ファイルに同名の名前空間コードをコピペして
//  作成し、同じ書き方でメソッドを追加していくことができる

var stsLib = stsLib || {};

  stsLib.string = stsLib.string || {};

  stsLib.String = stsLib.String || function(value) {
    var self = function() {};
    self.prototype = stsLib.String.prototype;
    self.prototype.value = value;
    return new self;
  }

//----------------------------------------*/

    //----------------------------------------
    //◇Include
    //----------------------------------------

    _.isInclude = function(str, search) {
      return (0 <= _.indexOfFirst(str, search))
    }

    _.test_isInclude = function() {
      var d = stsLib.debug;
      d.check(true, _.isInclude('abc', 'a'));
      d.check(true, _.isInclude('abc', 'b'));
      d.check(true, _.isInclude('abc', 'c'));
      d.check(false,_.isInclude('abc', 'd'));
      d.check(false,_.isInclude('abc', ''));
      d.check(false,_.isInclude('', 'a'));
    }

    _.includeCount = function(str, search) {
      //if (search === '') { return 0; }
      var result = 0;
      var index = 0;
      do {
        index = _.indexOfFirst(str, search, index)
        if (index === -1) { break; }
        index = index + search.length;
        result++;
      } while (true)
      return result;
    }

    _.test_includeCount = function() {
      var d = stsLib.debug;
      d.check(3, _.includeCount("123123123", "1"),    "A");
      d.check(3, _.includeCount("123123123", "2"),    "B");
      d.check(3, _.includeCount("123123123", "3"),    "C");
      d.check(3, _.includeCount("123123123", "12"),   "D");
      d.check(2, _.includeCount("123123123", "31"),   "E");
      d.check(6, _.includeCount("AAAAAA", "A"),       "F");
      d.check(3, _.includeCount("AAAAAA", "AA"),      "G");
    }

    //----------------------------------------
    //◇indexOf 系
    //----------------------------------------

    _.indexOfFirst = function(str, search, startIndex) {
      if (search === '') { return -1 }
      if (stsLib.type.isNullOrUndefined(startIndex)) { startIndex = 0; }
      return str.indexOf(search, startIndex);
    }

    _.test_indexOfFirst = function() {
      var d = stsLib.debug;
      d.check(-1, _.indexOfFirst('abc', 'd'));
      d.check( 0, _.indexOfFirst('abc', 'a'));
      d.check( 1, _.indexOfFirst('abc', 'b'));
      d.check( 2, _.indexOfFirst('abc', 'c'));
      d.check(-1, _.indexOfFirst('abc', ''));
      d.check( 0, _.indexOfFirst('abcabc', 'a'));
      d.check( 1, _.indexOfFirst('abcabc', 'b'));
      d.check( 2, _.indexOfFirst('abcabc', 'c'));

      d.check( 0, _.indexOfFirst('abcabc', 'a', 0));
      d.check( 3, _.indexOfFirst('abcabc', 'a', 1));
      d.check( 1, _.indexOfFirst('abcabc', 'b', 1));
      d.check( 4, _.indexOfFirst('abcabc', 'b', 2));
      d.check( 2, _.indexOfFirst('abcabc', 'c', 2));
      d.check( 5, _.indexOfFirst('abcabc', 'c', 3));
    }

    _.indexOfLast = function(str, search, startIndex) {
      if (search === '') { return -1 }
      if (stsLib.type.isNullOrUndefined(startIndex)) {
        startIndex = str.length - 1; 
      }
      return str.lastIndexOf(search, startIndex);
    }

    _.test_indexOfLast = function() {
      var d = stsLib.debug;
      d.check(-1, _.indexOfLast('abc', 'd'));
      d.check( 0, _.indexOfLast('abc', 'a'));
      d.check( 1, _.indexOfLast('abc', 'b'));
      d.check( 2, _.indexOfLast('abc', 'c'));
      d.check(-1, _.indexOfLast('abc', ''));
      d.check( 3, _.indexOfLast('abcabc', 'a'));
      d.check( 4, _.indexOfLast('abcabc', 'b'));
      d.check( 5, _.indexOfLast('abcabc', 'c'));

      d.check( 3, _.indexOfLast('abcabc', 'a', 3));
      d.check( 0, _.indexOfLast('abcabc', 'a', 2));
      d.check( 4, _.indexOfLast('abcabc', 'b', 4));
      d.check( 1, _.indexOfLast('abcabc', 'b', 3));
      d.check( 5, _.indexOfLast('abcabc', 'c', 5));
      d.check( 2, _.indexOfLast('abcabc', 'c', 4));
    }

    //----------------------------------------
    //◇Substring系
    //----------------------------------------

    //----------------------------------------
    //・Index指定のSubstring
    //----------------------------------------
    //  ・JavaScript標準のsubtring/sliceと似ているが
    //    Indexの不自然さを排除
    //    endIndexの位置で切り取り
    //  ・負の値のIndexに対応
    //    -1は最後の文字になる
    //----------------------------------------
    _.substrIndex = function(str, startIndex, endIndex) {
      var d = stsLib.debug;
      var t = stsLib.type;
      if (t.isUndefined(endIndex)) {
        endIndex = str.length - 1;
      }
      d.assert(t.isString(str));
      d.assert(t.isInt(startIndex));
      d.assert(t.isInt(endIndex));

      if (startIndex < 0) {
        startIndex = str.length + startIndex;
      }
      if (stsLib.type.isNullOrUndefined(endIndex)) {
        endIndex = str.length - 1;
      } else if (endIndex < 0) {
        endIndex = str.length + endIndex
      }

      if (startIndex <= endIndex) {
        return str.substring(startIndex, endIndex + 1);
      } else {
        return str.substring(endIndex, startIndex + 1);
      }
    }

    _.test_substrIndex = function() {
      var d = stsLib.debug;
      d.check("45",     _.substrIndex("012345", 4));
      d.check("2345",   _.substrIndex("012345", -4));
      d.check("1",      _.substrIndex("012345", 1, 1));
      d.check("1234",   _.substrIndex("012345", 1, 4));
      d.check("345",    _.substrIndex("012345", 3, 10));
      d.check("1234",   _.substrIndex("012345", 4, 1));
      d.check("345",    _.substrIndex("012345", 10, 3));

      d.check("5",      _.substrIndex("012345", -1, -1));
      d.check("2345",   _.substrIndex("012345", -1, -4));
      d.check("0123",   _.substrIndex("012345", -3, -10));
      d.check("2345",   _.substrIndex("012345", -4, -1));
      d.check("0123",   _.substrIndex("012345", -10, -3));

      d.check("0",      _.substrIndex("012345", 0, 0));
      d.check("5",      _.substrIndex("012345", 5, 5));
      d.check("45",     _.substrIndex("012345", -1, 4));
      d.check("45",     _.substrIndex("012345", 4, -1));
      d.check("12",   _.substrIndex("012345", -4, 1));
      d.check("12",   _.substrIndex("012345", 1, -4));
      d.check("0123",   _.substrIndex("012345", -10, 3));
      d.check("0123",   _.substrIndex("012345", 3, -10));
      d.check("345",   _.substrIndex("012345", 10, -3));
      d.check("345",   _.substrIndex("012345", -3, 10));
    }

    //----------------------------------------
    //・Length指定のSubstring
    //----------------------------------------
    //  ・JavaScript標準のsubstrと似ているが
    //    負のlengthに対応
    //  ・負の値のIndexに対応
    //    -1は最後の文字になる
    //  ・lengthは1を指定しても-1を指定しても同じ
    //    -2を指定すると前方文字を取得する
    //----------------------------------------
    _.substrLength = function(str, startIndex, length) {
      if (length === 0) { return ''; }
      if ((startIndex < (-1 * str.length)) 
      || ((str.length) < startIndex)) { return '';}
      if (startIndex < 0) {
        startIndex = str.length + startIndex;
      }
      
      if (stsLib.type.isNullOrUndefined(length)) {
        length = str.length;
      }
      var endIndex;
      if (length < 0) {
        endIndex = startIndex + length + 1;
      } else {
        endIndex = startIndex + length - 1;
      }

      return _.substrIndex(str, startIndex, endIndex);
    }

    _.test_substrLength = function() {
      var d = stsLib.debug;
      d.check("45",   _.substrLength("012345", 4));
      d.check("2345", _.substrLength("012345", -4));
      d.check("23",   _.substrLength("012345", 2, 2));
      d.check("234",  _.substrLength("012345", 2, 3));
      d.check("345",  _.substrLength("012345", 3, 10));
      d.check("4",    _.substrLength("012345", 4, 1));
      d.check("",     _.substrLength("012345", 10, 3));

      d.check("5",    _.substrLength("012345", -1, -1));
      d.check("45",   _.substrLength("012345", -1, -2));
      d.check("0123", _.substrLength("012345", -3, -10));
      d.check("34",   _.substrLength("012345", -3, 2));
      d.check("2",    _.substrLength("012345", -4, -1));
      d.check("2",    _.substrLength("012345", -4, 1));
      d.check("12",   _.substrLength("012345", -4, -2));
      d.check("23",   _.substrLength("012345", -4, 2));
      d.check("",     _.substrLength("012345", -10, -3));

      d.check("",     _.substrLength("012345", 0, 0));
      d.check("",     _.substrLength("012345", 3, 0));
    }

    //----------------------------------------
    //◇Start
    //----------------------------------------

    //----------------------------------------
    //・先頭を切り取るメソッド
    //----------------------------------------
    _.start = function(str, length) {
      var d = stsLib.debug;
      var t = stsLib.type;
      d.assert(t.isString(str));
      d.assert(t.isInt(length));
      if (str === '') { return ''; }
      if (length <= 0) { return ''; }
      
      return _.substrLength(str, 0, length);
    }

    _.test_start = function() {
      var d = stsLib.debug;
      d.check("0123",   _.start("012345", 4));
      d.check("",       _.start("012345", 0));
      d.check("",       _.start("012345", -3));
      d.check("01",     _.start("012345", 2));
      d.check("012",    _.start("012345", 3));
      d.check("012345", _.start("012345", 6));
      d.check("012345", _.start("012345", 10));
    }

    _.startsWith = function(str, search) {
      if (search === '') { return false; }
      if (str === '') { return false; }
      if (str.length < search.length) { return false; }

      if (_.indexOfFirst(str, search) === 0) {
        return true;
      } else {
        return false;
      }
    }

    //----------------------------------------
    //・先頭の一致を調べる
    //----------------------------------------
    _.test_startsWith = function() {
      var d = stsLib.debug;
      d.check(true,  _.startsWith("12345", "1"), "A");
      d.check(true,  _.startsWith("12345", "12"), "B");
      d.check(true,  _.startsWith("12345", "123"), "C");
      d.check(false, _.startsWith("12345", "23"), "D");
      d.check(false, _.startsWith("", "34"), "E");
      d.check(false, _.startsWith("12345", ""), "F");
      d.check(false, _.startsWith("123", "1234"), "G");
    }

    //----------------------------------------
    //・先頭に含む
    //----------------------------------------
    _.includeStart = function(str, search) {
      if (_.startsWith(str, search)) {
        return str;
      } else {
        return search + str;
      }
    }

    _.test_includeStart = function() {
      var d = stsLib.debug;
      d.check("12345",  _.includeStart("12345", "1"));
      d.check("12345",  _.includeStart("12345", "12"));
      d.check("12345",  _.includeStart("12345", "123"));
      d.check("2312345",_.includeStart("12345", "23"));
    }

    //----------------------------------------
    //・先頭から取り除く
    //----------------------------------------
    _.excludeStart = function(str, search) {
      if (_.startsWith(str, search)) {
        return _.substrIndex(str, search.length);
      } else {
        return str;
      }
    }

    _.test_excludeStart = function() {
      var d = stsLib.debug;
      d.check("2345", _.excludeStart("12345", "1"));
      d.check("345",  _.excludeStart("12345", "12"));
      d.check("45",   _.excludeStart("12345", "123"));
      d.check("12345",_.excludeStart("12345", "23"));
    }

    //----------------------------------------
    //◇End
    //----------------------------------------

    //----------------------------------------
    //・先頭を切り取るメソッド
    //----------------------------------------
    _.end = function(str, length) {
      if (str === '') { return ''; }
      if (length <= 0) { return ''; }
      return _.substrLength(str, 
        Math.max(0, str.length - length));
    }

    _.test_end = function() {
      var d = stsLib.debug;
      d.check("2345",   _.end("012345", 4));
      d.check("",       _.end("012345", 0));
      d.check("",       _.end("012345", -3));
      d.check("45",     _.end("012345", 2));
      d.check("345",    _.end("012345", 3));
      d.check("012345", _.end("012345", 6));
      d.check("012345", _.end("012345", 10));
    }

    //----------------------------------------
    //・終端の一致を調べる
    //----------------------------------------
    _.endsWith = function(str, search) {
      if (search === '') { return false; }
      if (str === '') { return false; }
      if (str.length < search.length) { return false; }

      if (_.indexOfLast(str, search) === 
        str.length - search.length) {
        return true;
      } else {
        return false;
      }
    }

    _.test_endsWith = function() {
      var d = stsLib.debug;
      d.check(true,  _.endsWith("12345", "5"));
      d.check(true,  _.endsWith("12345", "45"));
      d.check(true,  _.endsWith("12345", "345"));
      d.check(false, _.endsWith("12345", "34"));
      d.check(false, _.endsWith("", "34"));
      d.check(false, _.endsWith("12345", ""));
      d.check(false, _.endsWith("123", "1234"));
    }

    //----------------------------------------
    //・終端に含む
    //----------------------------------------
    _.includeEnd = function(str, search) {
      if (_.endsWith(str, search)) {
        return str;
      } else {
        return str + search;
      }
    }

    _.test_includeEnd = function() {
      var d = stsLib.debug;
      d.check("12345",   _.includeEnd("12345", "5"));
      d.check("12345",   _.includeEnd("12345", "45"));
      d.check("12345",   _.includeEnd("12345", "345"));
      d.check("1234534", _.includeEnd("12345", "34"));
    }

    //----------------------------------------
    //・終端から取り除く
    //----------------------------------------
    _.excludeEnd = function(str, search) {
      if (_.endsWith(str, search)) {
        return _.substrIndex(str, 0, 
          str.length - search.length - 1);
      } else {
        return str;
      };
    }

    _.test_excludeEnd = function() {
      var d = stsLib.debug;
      d.check("1234",  _.excludeEnd("12345", "5"));
      d.check("123",   _.excludeEnd("12345", "45"));
      d.check("12",    _.excludeEnd("12345", "345"));
      d.check("12345", _.excludeEnd("12345", "34"));
    }

    //----------------------------------------
    //◇両端 BothEnds
    //----------------------------------------
    _.includeBothEnds = function(str, search) {
      return _.includeStart(
        _.includeEnd(str, search));
    }

    _.excludeBothEnds = function(str, search) {
      return _.excludeStart(
        _.excludeEnd(str, search))
    }

    //----------------------------------------
    //◇delimiter
    //----------------------------------------

    //----------------------------------------
    //・startFirstDelim
    //----------------------------------------
    _.startFirstDelim = function(str, delimiter) {
      var index = _.indexOfFirst(str, delimiter);
      if (index === -1) {
        return str;
      } else if (index === 0) {
        return '';
      } else {
        return _.substrIndex(str, 0, index - 1);
      }
    }

    _.test_startFirstDelim = function() {
      var d = stsLib.debug;
      d.check("123", _.startFirstDelim("123,456", ","));
      d.check("123", _.startFirstDelim("123,456,789", ","));
      d.check("123", _.startFirstDelim("123ttt456", "ttt"));
      d.check("123", _.startFirstDelim("123ttt456", "tt"));
      d.check("123", _.startFirstDelim("123ttt456", "t"));
      d.check("123ttt456", _.startFirstDelim("123ttt456", ","))
      d.check("123", _.startFirstDelim("123,", ","))
      d.check("", _.startFirstDelim(",123", ","))
      d.check("", _.startFirstDelim(",123,", ","))
    }

    //----------------------------------------
    //・startLastDelim
    //----------------------------------------
    _.startLastDelim = function(str, delimiter) {
      var index = _.indexOfLast(str, delimiter);
      if (index === -1) {
        return str;
      } else if (index === 0) {
        return '';
      } else {
        return _.substrIndex(str, 0, index -1);
      }
    }

    _.test_startLastDelim = function() {
      var d = stsLib.debug;
      d.check("123", _.startLastDelim("123,456", ","));
      d.check("123,456", _.startLastDelim("123,456,789", ","));
      d.check("123", _.startLastDelim("123ttt456", "ttt"));
      d.check("123t", _.startLastDelim("123ttt456", "tt"));
      d.check("123tt", _.startLastDelim("123ttt456", "t"));
      d.check("123ttt456", _.startLastDelim("123ttt456", ","))
      d.check("123", _.startLastDelim("123,", ","))
      d.check("", _.startLastDelim(",123", ","))
      d.check(",123", _.startLastDelim(",123,", ","))
    }

    //----------------------------------------
    //・endFirstDelim
    //----------------------------------------
    _.endFirstDelim = function(str, delimiter) {
      var index = _.indexOfFirst(str, delimiter);
      if (index === -1) {
        return str;
      } else if (index === str.length - 1) {
        return '';
      } else {
        return _.substrIndex(str, index + delimiter.length);
      }
    }

    _.test_endFirstDelim = function() {
      var d = stsLib.debug;
      d.check("456", _.endFirstDelim("123,456", ","));
      d.check("456,789", _.endFirstDelim("123,456,789", ","));
      d.check("456", _.endFirstDelim("123ttt456", "ttt"));
      d.check("t456", _.endFirstDelim("123ttt456", "tt"));
      d.check("tt456", _.endFirstDelim("123ttt456", "t"));
      d.check("123ttt456", _.endFirstDelim("123ttt456", ","))
      d.check("", _.endFirstDelim("123,", ","))
      d.check("123", _.endFirstDelim(",123", ","))
      d.check("123,", _.endFirstDelim(",123,", ","))
    }


    //----------------------------------------
    //・endLastDelim
    //----------------------------------------
    _.endLastDelim = function(str, delimiter) {
      var index = _.indexOfLast(str, delimiter);
      if (index === -1) {
        return str;
      } else if (index === str.length - 1) {
        return '';
      } else {
        return _.substrIndex(str, index + delimiter.length);
      }
    }

    _.test_endLastDelim = function() {
      var d = stsLib.debug;

      d.check("456", _.endLastDelim("123,456", ","));
      d.check("789", _.endLastDelim("123,456,789", ","));
      d.check("456", _.endLastDelim("123ttt456", "ttt"));
      d.check("456", _.endLastDelim("123ttt456", "tt"));
      d.check("456", _.endLastDelim("123ttt456", "t"));
      d.check("123ttt456", _.endLastDelim("123ttt456", ","))
      d.check("", _.endLastDelim("123,", ","))
      d.check("123", _.endLastDelim(",123", ","))
      d.check("", _.endLastDelim(",123,", ","))
    }

  }());


  //----------------------------------------
  //◇オブジェクト拡張メソッド
  //----------------------------------------
  //  ・拡張メソッドのように後方にメソッドを接続して
  //    動作させることができる
  //      var str1 = new stsLib.String('abc');
  //      str1.isInclude('a');  //true
  //  ・new 無しでも動作するようにする仕組みも組み込んでいる
  //  ・stsLib.String の名前空間部分だけ記述が下記のように長い
  //----------------------------------------

  //名前空間
  _.String = stsLib.String || function(value) {
    var self = function() {};
    self.prototype = stsLib.String.prototype;
    self.prototype.value = value;
    return new self;
  };
  (function () {
    var _ = stsLib.String;

    _.prototype.isInclude = function (search) {
      return stsLib.string.isInclude(this.value, search);
    };

    _.prototype.indexOfFirst = function (search) {
      return stsLib.string.indexOfFirst(this.value, search);
    };

    _.prototype.indexOfLast = function (search) {
      return stsLib.string.indexOfLast(this.value, search);
    };

    _.prototype.test = function () {
      var d = stsLib.debug;

      //拡張メソッド的な使い方
      var str1 = new stsLib.String('abc');
      d.check(true, str1.isInclude('a'));
      d.check(true, str1.isInclude('b'));
      d.check(true, str1.isInclude('c'));
      d.check(false,str1.isInclude('d'));

      //newしなくてもよい
      var str2 = stsLib.String('abc');
      d.check(true, str2.isInclude('a'));
      d.check(true, str2.isInclude('b'));
      d.check(true, str2.isInclude('c'));
      d.check(false,str2.isInclude('d'));
    };
  }());

  ////----------------------------------------
  ////◇オブジェクト拡張メソッド継承
  ////----------------------------------------
  ////  ・拡張メソッドの方のオブジェクトは継承して
  ////    次のようなものを作ることができる
  ////  ・ただしWSH JScript は Object.setPrototypeOf 非対応
  ////----------------------------------------
  //_.StringEx = stsLib.StringEx || function(value) {
  //  var self = function() {};
  //  self.prototype = stsLib.StringEx.prototype;
  //  self.prototype.value = value;
  //  return new self;
  //};
  //Object.setPrototypeOf(stsLib.StringEx.prototype, stsLib.String.prototype);
  //(function () {
  //  var _ = stsLib.StringEx;
  //
  //  _.prototype.isNotInclude = function(search) {
  //    return !stsLib.string.isInclude(this.value, search);
  //  }
  //
  //  _.prototype.test = function () {
  //    var d = stsLib.debug;
  //
  //    //継承してもいい
  //    var str3 = new stsLib.StringEx('abc');
  //    d.check(false,str3.isNotInclude('a'));
  //    d.check(false,str3.isNotInclude('b'));
  //    d.check(false,str3.isNotInclude('c'));
  //    d.check(true, str3.isNotInclude('d'));
  //    d.check(true, str3.isInclude('a'));
  //    d.check(true, str3.isInclude('b'));
  //    d.check(true, str3.isInclude('c'));
  //    d.check(false,str3.isInclude('d'));
  //
  //    //継承して new しなくてもよい
  //    var str4 = new stsLib.StringEx('abc');
  //    d.check(false,str4.isNotInclude('a'));
  //    d.check(false,str4.isNotInclude('b'));
  //    d.check(false,str4.isNotInclude('c'));
  //    d.check(true, str4.isNotInclude('d'));
  //    d.check(true, str4.isInclude('a'));
  //    d.check(true, str4.isInclude('b'));
  //    d.check(true, str4.isInclude('c'));
  //    d.check(false,str4.isInclude('d'));
  //  };
  //
  //}());


  //----------------------------------------
  //◆日付時刻処理
  //----------------------------------------

  //----------------------------------------
  //◆ファイルフォルダパス処理
  //----------------------------------------

}());


//----------------------------------------
//■リファクタリング前、関数部
//----------------------------------------

//----------------------------------------
//◆動作確認
//----------------------------------------
function test_stslib_core() {

  stsLib.debug.test_check();
  stsLib.type.test_isNullOrUndefined();
  stsLib.type.test_isBoolean();
  stsLib.type.test_isNumber();
  stsLib.type.test_isInt();
  var st = stsLib.string;
  st.test_isInclude();
  st.test_includeCount();
  st.test_indexOfFirst();
  st.test_indexOfLast();
  st.test_substrIndex();
  st.test_substrLength();
  st.test_start();
  st.test_startsWith();
  st.test_includeStart();
  st.test_excludeStart();
  st.test_end();
  st.test_endsWith();
  st.test_includeEnd();
  st.test_excludeEnd();
  st.test_startFirstDelim();
  st.test_startLastDelim();
  st.test_endFirstDelim();
  st.test_endLastDelim();
  
  var new_String = new stsLib.String('abc');
  new_String.test();

  //WSH 非対応なので実行させない
  //var new_StringEx = new stsLib.StringEx('123');
  //new_StringEx.test();


  test_equalOperator();

//  test_firstStrFirstDelim();
//  test_firstStrLastDelim();
//  test_lastStrFirstDelim();
//  test_lastStrLastDelim();
//
//  test_tagInnerText();
//  test_tagOuterText();

//  test_trimFirstStrs();
//  test_trimLastStrs();

//  test_replaceAll();
//
//  test_arrayToString();
//  test_stringToArray();
//
//  test_arrayValueEqual();
//  test_arrayIndexOfArray();
//
//  test_TagDelete();
//  test_deleteTagInnerText();
//  test_deleteTagOutterText();
//
//  test_angleRelative();
//  test_degreeToRadian();

  alert("finish test テスト終了");
}

//----------------------------------------
//・イコール演算子の挙動
//----------------------------------------
function test_equalOperator() {
  var d = stsLib.debug;
  var value;
  value = true;
  d.check(true , value==true        ,"v01-01");
  //↓boolean型とstring型は比較一致不可能
  d.check(false, value=="true"      ,"v01-02");
  //↓『+""』を付属して文字列化すれば一致確認OK
  d.check(true , value+""=="true"   ,"v01-03");
  //↓文字列に『!!』を付属するとtrueが返される
  d.check(true , value==!!"true"    ,"v01-04");
  d.check(true , !!value==!!"true"  ,"v01-05");
  //↓boolean型側に『!!』を付属させてもNG
  d.check(false, !!value=="true"    ,"v01-06");
  d.check(true , !!value==true      ,"v01-06-02");

  d.check(false, value==false       ,"v01-07");
  d.check(false, value=="false"     ,"v01-08");
  d.check(false, value+""=="false"  ,"v01-09");
  //↓文字列に『!!』を付属するとtrueが返されるので
  //  判定はできない
  d.check(true , value==!!"false"   ,"v01-10");
  d.check(true , !!value==!!"false" ,"v01-11");
  d.check(false, !!value=="false"   ,"v01-12");
  d.check(false, !!value==false     ,"v01-13");

  value = false;
  d.check(false , value==true       ,"v02-01");
  d.check(false, value=="true"      ,"v02-02");
  d.check(false, value+""=="true"   ,"v02-03");
  d.check(false, value==!!"true"    ,"v02-04");
  d.check(false, !!value==!!"true"  ,"v02-05");
  d.check(false, !!value=="true"    ,"v02-06");
  d.check(false, !!value==true      ,"v02-06-02");

  d.check(true , value==false       ,"v02-07");
  //↓boolean型とstring型は比較一致不可能
  d.check(false, value=="false"     ,"v02-08");
  //↓『+""』を付属して文字列化すれば一致確認OK
  d.check(true , value+""=="false"  ,"v02-09");
  //↓文字列に『!!』を付属するとtrueが返されるので
  //  判定はできない
  d.check(false, value==!!"false"   ,"v02-10");
  d.check(false, !!value==!!"false" ,"v02-11");
  d.check(false, !!value=="false"   ,"v02-12");
  d.check(true , !!value==false     ,"v02-13");

  //というわけで
  //falseの場合は[!!値]では判定できないので
  //!!でキャストできるという噂は嘘

  var s;
  s = "true";
  d.check(true , s=="true"          ,"V03-01");
  //↓boolean型とstring型は比較一致不可能
  d.check(false, s==true            ,"V03-01");
  //↓文字列に『!!』を付属するとtrueが返されるので
  //  合っているようにみえるが
  d.check(true , !!s==true          ,"V03-02");

  d.check(false, s==false           ,"V03-03");
  //↓文字列に『!!』を付属するとtrueが返されるので
  //  合っているようにみえるが
  d.check(false, !!s==false         ,"V03-04");

  s = "false";
  d.check(false, s=="true"          ,"V04-01");
  d.check(false, s==true            ,"V04-01");
  //↓文字列に『!!』を付属するとtrueが返されるので
  //  falseの場合でもtrueと判定してしまう
  d.check(true , !!s==true          ,"V04-02");

  d.check(false, s==false           ,"V04-03");
  //↓文字列に『!!』を付属するとtrueが返されるので
  //  falseの場合でも一致しない
  d.check(false, !!s==false         ,"V04-04");
}

//----------------------------------------
//◆条件判断
//----------------------------------------






//----------------------------------------
//◆型、型変換
//----------------------------------------



//----------------------------------------
//◆数値
//----------------------------------------

//----------------------------------------
//◆角度
//----------------------------------------

//----------------------------------------
//・ラジアンと角度相互変換
//----------------------------------------
function degreeToRadian(value) {
  return value * Math.PI / 180;
}

function radianToDegree(value) {
  return value * 180 / Math.PI;
}

function test_degreeToRadian() {
  var d = stsLib.debug;
  d.check(0, degreeToRadian(0));
  d.check(Math.PI / 6, degreeToRadian(30));
  d.check(0, radianToDegree(0));
  d.check(30, Math.round(radianToDegree(Math.PI / 6)));
}


//----------------------------------------
//・絶対角度から相対角度を求める
//----------------------------------------
//  ・  base と target は角度の絶対座標で
//      0度から360度とする。
//      それ以上それ以下でも0-360に丸め込まれる
//  ・  戻り値は -180～+180 になる
//----------------------------------------
function angleRelative(base, target) {
  base = base % 360;
  target = target % 360;
  var result = target - base;
  //result は -360～+360になる
  if (180 < result) {
    result = result -360;
  } else if (result < -180) {
    result = result + 360;
  }
  return result;
}

function test_angleRelative() {
  var d = stsLib.debug;
  d.check(10, angleRelative(5, 15));
  d.check(-10, angleRelative(15, 5));

  d.check(90, angleRelative(90, 180));
  d.check(180, angleRelative(90, 270));
  d.check(180, angleRelative(0, 180));

  d.check(-179, angleRelative(0, 181));
  d.check(179, angleRelative(181, 0));
  d.check(-179, angleRelative(179, 0));
}

//----------------------------------------
//◆配列処理
//----------------------------------------


//----------------------------------------
//・配列の値で比較する関数
//----------------------------------------

function arrayEqualArray(value1, value2)
{
  var d = stsLib.debug;
  d.assert(isArray(value1));
  d.assert(isArray(value2));

  return value1.toString() === value2.toString();
}

function test_arrayValueEqual()
{
  var d = stsLib.debug;
  var a1 = [1, 2, 3];
  var a2 = [1, 2, 3];

  d.check(false, a1 == a2);
  d.check(false, a1 === a2);

  d.check(true, arrayEqualArray(a1, a2));
}

//----------------------------------------
//・配列の値で比較して出力するindexOf
//----------------------------------------
function arrayIndexOfArray(arrayList, arrayValue)
{
  var d = stsLib.debug;
  d.assert(isArray(arrayList));
  d.assert(isArray(arrayValue));

  for (var i = 0; i <= arrayList.length - 1; i++)
  {
    if (arrayEqualArray(arrayList[i], arrayValue))
    {
      return i;
    }
  }
  return -1;
}

function test_arrayIndexOfArray()
{
  var d = stsLib.debug;
  var arrayList = [];
  arrayList.push([1,1,1]);
  arrayList.push([2,2,2]);
  arrayList.push([3,3,3]);

  var a1 = [1, 2, 3];
  d.check(-1, arrayIndexOfArray(arrayList, a1));

  a1 = [1, 1, 1];
  d.check(0, arrayIndexOfArray(arrayList, a1));
  a1 = [2, 2, 2];
  d.check(1, arrayIndexOfArray(arrayList, a1));
  a1 = [3, 3, 3];
  d.check(2, arrayIndexOfArray(arrayList, a1));
}

//----------------------------------------
//◇配列文字列変換
//----------------------------------------

function arrayToString(arrayValue, delimiter) {
  var undefined;
  if (arrayValue[0] === undefined) { return ""; };
  if (delimiter === undefined) {delimiter = ""};
  var result = arrayValue[0];
  var i = 1;
  while(arrayValue[i] !== undefined) {
    result += delimiter + arrayValue[i];
    i++;
  }
  return result;
}
function test_arrayToString(){
  var d = stsLib.debug;
  var array01 = new Array();
  array01[0] = "abc";
  array01[1] = "def";
  d.check("abc-def", arrayToString(array01, "-"));

  var array02 = new Array("123", "456");
  d.check("123_456", arrayToString(array02, "_"));
}

function stringToArray(value, delimiter) {
  return value.split(delimiter);
}
function test_stringToArray(){
  var d = stsLib.debug;
  var array03 = stringToArray("ABC/DEF", "/");
  d.check("ABC", array03[0]);
  d.check("DEF", array03[1]);
}



//----------------------------------------
//◆文字列処理
//----------------------------------------


//----------------------------------------
//・値が空文字の場合だけ別の値を返す関数
//----------------------------------------
function ifEmptyStr(value , EmptyStrCaseValue) {
  var result = "";
  if (value === "") {
    result = EmptyStrCaseValue;
  } else {
    result = value;
  }
  return result;
}




//--------------------------------------
//Tag処理
//--------------------------------------

//----------------------------------------
//・タグの内部文字列
//----------------------------------------
function tagInnerText(text, startTag, endTag) {

  var result
  result = lastStrFirstDelim(text, startTag)
//  result = firstStrFirstDelim(result, endTag)
  return result
}

function test_tagInnerText() {
  var d = stsLib.debug;
  d.check("456", tagInnerText("000<123>456<789>000", "<123>", "<789>"), "test01");
  d.check("456", tagInnerText("<123>456<789>", "<123>", "<789>"), "test02");
  d.check("456", tagInnerText("000<123>456", "<123>", "<789>"), "test03");
  d.check("456", tagInnerText("456<789>000", "<123>", "<789>"), "test04");
  d.check("456", tagInnerText("456", "<123>", "<789>"), "test05");
  d.check("", tagInnerText("000<123><789>000", "<123>", "<789>"), "test06");

  d.check("123", tagInnerText("<123>123<789> <123>456<789> <123>789<789>", "<123>", "<789>"));
  var Text = "<123>123<789> <123>456<789> <123>789<789>";
  d.check("<123>123", tagInnerText(Text, "<456>", "<789>"));
  d.check("", tagInnerText(Text, "<456>", "<123>"));
  d.check(Text, tagInnerText(Text, "<321>", "<456>"));
}

//----------------------------------------
//・タグを含んだ内部文字列
//----------------------------------------
function tagOuterText(text, startTag, endTag) {

  var result1;
  var result2;
  result1 = lastStrFirstDelim(text, startTag)
  if (result1 != text) {
    result1 = startTag + result1
  }

//  result2 = firstStrFirstDelim(result1, endTag)
  if (result2 != result1) {
    result2 = result2 + endTag
  }
  return result2
}

function test_tagOuterText() {
  var d = stsLib.debug;
  d.check("<123>456<789>", tagOuterText("000<123>456<789>000", "<123>", "<789>"), "test01")
  d.check("<123>456<789>", tagOuterText("<123>456<789>", "<123>", "<789>"), "test02")
  d.check("<123>456", tagOuterText("000<123>456", "<123>", "<789>"), "test03")
  d.check("456<789>", tagOuterText("456<789>000", "<123>", "<789>"), "test04")
  d.check("456", tagOuterText("456", "<123>", "<789>"), "test05")
}

//--------------------------------------
//◇Trim
//--------------------------------------
function trimFirstStrs(str, trimStrArray) {
  var result = str
  do {
    str = result;
    for (var i = 0; i <= trimStrArray.length - 1; i++) {
      //result = excludeFirstStr(result, trimStrArray[i]);
    }
  } while (result !== str)
  return result
}

function test_trimFirstStrs() {
  var d = stsLib.debug;
  d.check("123 ",       trimFirstStrs("   123 ", [" "]))
  d.check("\t  123 ",   trimFirstStrs("   \t  123 ", [" "]))
  d.check("123 ",       trimFirstStrs("   \t  123 ", [" ", "\t"]))
}

function trimLastStrs(str, trimStrArray) {
  var result = str
  do {
    str = result;
    for (var i = 0; i <= trimStrArray.length - 1; i++) {
//          result = excludeLastStr(result, trimStrArray[i]);
    }
  } while (result !== str)
  return result
}

function test_trimLastStrs() {
  var d = stsLib.debug;
  d.check(" 123",       trimLastStrs(" 123   ", [" "]))
  d.check(" 456  \t",   trimLastStrs(" 456  \t   ", [" "]))
  d.check(" 789",       trimLastStrs(" 789  \t   ", [" ", "\t"]))
}

function trimBothEndsStrs(str, trimStrArray) {
  return trimFirstStrs(trimLastStrs(str, trimStrArray), trimStrArray)
}

//--------------------------------------
//◇置き換え処理
//--------------------------------------

//----------------------------------------
//・replaceAll
//----------------------------------------
//  ・  文字列の繰り返し置換
//----------------------------------------
function replaceAll(strBuffer, strBefore, strAfter) {
  var result = strBuffer
  do {
    strBuffer = result;
    result = strBuffer.replace(strBefore, strAfter);
  } while (strBuffer !== result);
    return result;
}

function test_replaceAll() {
    var d = stsLib.debug;
    d.check("AAABBBAAA", replaceAll("123BBB123", "123", "AAA"));
    d.check("ABBBBBBBA", replaceAll("AAAAAAABBBBBBBAAAAAAA", "AA", "A"));
}

//----------------------------------------
//◇タグ処理
//----------------------------------------

function startTagDelete(value, tag) {
  if (value.indexOf(tag) !== -1) {
    return firstStrFirstDelim(value, tag) + 
      lastStrFirstDelim(value, tag);
  }
  return value;
}

function endTagDelete(value, tag) {
  if (value.lastIndexOf(tag) !== -1) {
    return firstStrLastDelim(value, tag) + 
      lastStrLastDelim(value, tag);
  }
  return value;
}

function test_TagDelete() {
  var d = stsLib.debug;
  d.check("abcdefghi", startTagDelete(endTagDelete("abc<def>ghi", ">"), "<"));
  d.check("abc><def><ghi", startTagDelete(endTagDelete("a<bc><def><gh>i", ">"), "<"));
  d.check("abcdefghi", startTagDelete(endTagDelete("abc>def<ghi", ">"), "<"));
  d.check("abc>def<ghi", startTagDelete(endTagDelete("a<bc>def<gh>i", ">"), "<"));
}

function deleteTagInnerText(text, startTag, endTag) {
  var d = stsLib.debug;
  var t = stsLib.type;
  d.assert((!t.isNullOrUndefined(text)) );
  d.assert((!t.isNullOrUndefined(startTag)) && (startTag !=='') );
  d.assert((!t.isNullOrUndefined(endTag)) && (endTag !=='') );
  if (text === '') { return ''; }

  var indexStartTag = text.indexOf(startTag);
  var indexEndTag = text.indexOf(endTag);
  if ((indexStartTag !== -1) 
  && (indexEndTag !== -1)
  && (indexStartTag < indexEndTag)) {
    text = 
      firstStrFirstDelim(text, startTag) + startTag + 
      endTag + lastStrFirstDelim(text, endTag) 
  }
  return text;
}

function test_deleteTagInnerText() {
  var d = stsLib.debug;
  d.check('abc<>ghi', deleteTagInnerText('abc<def>ghi', '<', '>'));
}

function deleteTagOutterText(text, startTag, endTag) {
  var d = stsLib.debug;
  var t = stsLib.type;
  d.assert((!t.isNullOrUndefined(text)) );
  d.assert((!t.isNullOrUndefined(startTag)) && (startTag !=='') );
  d.assert((!t.isNullOrUndefined(endTag)) && (endTag !=='') );
  if (text === '') { return ''; }

  var indexStartTag = text.indexOf(startTag);
  var indexEndTag = text.indexOf(endTag);
  if ((indexStartTag !== -1) 
  && (indexEndTag !== -1)
  && (indexStartTag < indexEndTag)) {
    text = 
      firstStrFirstDelim(text, startTag) +  
      lastStrFirstDelim(text, endTag) 
  }
  return text;
}

function test_deleteTagOutterText() {
  var d = stsLib.debug;
  d.check('abcghi', deleteTagOutterText('abc<def>ghi', '<', '>'));
}

//----------------------------------------
//◆日付時刻処理
//----------------------------------------
//文字列を後方から文字数指定で取得する
function lastStringCount(value, count) {
  return value.substr(value.length - count, count)
}

function format_yyyy_mm_dd(value, delimiter){
  return value.getFullYear() + delimiter +
    lastStringCount("0" + (value.getMonth()+1), 2) + delimiter +
    lastStringCount("0" + value.getDate(), 2);
  //return "123";
}

function format_hh_mm_dd(value, delimiter){
  return value.getHours() + delimiter +
    lastStringCount("0" + value.getMinutes(), 2) + delimiter +
    lastStringCount("0" + value.getSeconds(), 2);
  //return "123";
}

//年齢
function getAgeYearMonthDay(todayDate, birthDate) {

  var birthYear = birthDate.getFullYear();
  var birthMonth = birthDate.getMonth() + 1;
  var birthDay = birthDate.getDate();
  var todayYear = todayDate.getFullYear();
  var todayMonth = todayDate.getMonth() + 1;
  var todayDay = todayDate.getDate();

  //年齢計算
  var diffYear = todayYear - birthYear;
  //過去と同一日を過ぎていなければ１引く
  if (todayMonth < birthMonth) {
    diffYear = diffYear - 1;
  } else {
    if ((todayMonth === birthMonth) && (todayDay < birthDay)) {
      diffYear = diffYear - 1;
    }
  }
  //年齢の月計算
  var diffMonth = ((todayYear * 12) + todayMonth)
    - ((birthYear * 12) + birthMonth);
  if (todayDay < birthDay) {
    diffMonth = diffMonth - 1;
  };
  //年齢の日計算
  var diffDay = todayDate.getDate() - birthDate.getDate();
  if (diffDay < 0) {
    //前月の過去日と同一日からの経過日数を計算している
    diffDay =
      getMonthEndDay(todayDate.getYear(), todayDate.getMonth())
      - birthDate.getDate()
      + todayDate.getDate();
  }
  return {"year": diffYear,
      "month": diffMonth - (diffYear * 12),
      "day": diffDay};
}

//年齢
function getAgeMonthDay(todayDate, birthDate) {

  var birthYear = birthDate.getFullYear();
  var birthMonth = birthDate.getMonth() + 1;
  var birthDay = birthDate.getDate();
  var todayYear = todayDate.getFullYear();
  var todayMonth = todayDate.getMonth() + 1;
  var todayDay = todayDate.getDate();

  //年齢の月計算
  var diffMonth = ((todayYear * 12) + todayMonth)
    - ((birthYear * 12) + birthMonth);
  if (todayDay < birthDay) {
    diffMonth = diffMonth - 1;
  };
  //年齢の日計算
  var diffDay = todayDate.getDate() - birthDate.getDate();
  if (diffDay < 0) {
    //前月の過去日と同一日からの経過日数を計算している
    diffDay =
      getMonthEndDay(todayDate.getYear(), todayDate.getMonth())
      - birthDate.getDate()
      + todayDate.getDate();
  }
  return {"month": diffMonth,
      "day": diffDay};
}

function getAgeDay(todayDate, birthDate) {

  var birthYear = birthDate.getFullYear();
  var birthMonth = birthDate.getMonth() + 1;
  var birthDay = birthDate.getDate();
  var todayYear = todayDate.getFullYear();
  var todayMonth = todayDate.getMonth() + 1;
  var todayDay = todayDate.getDate();

  //年齢の日計算
  var date1 = new Date(birthYear, birthMonth - 1, birthDay);
  var date2 = new Date(todayYear, todayMonth - 1, todayDay);

  var diffDay = date2 - date1;
  diffDay = diffDay / ( 24 * 60 * 60 * 1000);
  return {"day": diffDay};
}

function dayCount(todayDate, birthDate) {
  var diff = todayDate - birthDate;
  diff = diff / ( 24 * 60 * 60 * 1000);
  return Math.floor(diff);
}

function hoursCount(todayDate, birthDate) {
  var diff = todayDate - birthDate;
  var diff = diff / ( 60 * 60 * 1000);
  return Math.floor(diff);
}

function minutesCount(todayDate, birthDate) {
  var diff = todayDate - birthDate;
  var diff = diff / ( 60 * 1000);
  return Math.floor(diff);
}

function secondsCount(todayDate, birthDate) {
  var diff = todayDate - birthDate;
  var diff = diff / (1000);
  return Math.floor(diff);
}

/*  --------------
年月を指定して月末日を求める関数
引数：  year 年
    month 月
備考：  指定月の翌月の0日を取得して末日を求める
    monthに11(月)を指定すると
    Dateは0～11で月を表すためDate(year, 11, 0)は
    12月の0日を表すので11月末日を示すことになる
参考：
  JavaScript による日付・時刻・時間の計算・演算のまとめ - hoge256ブログ
  http://www.hoge256.net/2007/08/64.html
------------  */
function getMonthEndDay(year, month) {
  var dt = new Date(year, month, 0);
  return dt.getDate();
}


//----------------------------------------
//◆ファイルフォルダパス処理
//----------------------------------------
function getFileName(fileName) {
  return fileName.substring(fileName.lastIndexOf("/")+1,fileName.length);
}
function test_getFileName() {
  d.check("a.txt", getFileName("file://test/test/a.txt"));
}

//----------------------------------------
//・終端にパス区切りを追加する関数
//----------------------------------------
function includeLastPathDelim(path) {
  var result = "";
  if (path != "") {
    result = includeLastStr(path, "\\");
  };
  return result;
}

//----------------------------------------
//・ピリオドを含んだ拡張子を取得する
//----------------------------------------
function getExtensionIncludePeriod(path) {
  var result = "";
  result = lastStrLastDelim(path, ".");
  if (result == path) {
    result = ""
  } else {
    result = includeFirstStr(result, ".")
  }
  return result;
}


/*----------------------------------------
■履歴
◇  ver 2014/07/18
・  作成
    lastStringCount
    format_yyyy_mm_dd
    format_hh_mm_dd(
    getAgeYearMonthDay
    getAgeMonthDay
    getAgeDay
    dayCount
    hoursCount
    minutesCount
    secondsCount
    getMonthEndDay
    arrayToString
    encodeURIComponentArrayToString
    stringToArray
    decodeURIComponentStringToArray
    getFileName
◇  ver 2015/07/02
    replaceAll
◇  ver 2015/07/31
・  firstStrFirstDelim/lastStrFirstDelim 追加
◇  ver 2015/08/02
・  追加
    isFirstStr
    includeFirstStr
    excludeFirstStr
    isFirstText
    includeFirstText
    excludeFirstText
    isLastStr
    includeLastStr
    excludeLastStr
    isLastText
    includeLastText
    excludeLastText
    includeBothEndsStr
    excludeBothEndsStr
    includeBothEndsText
    ExcludeBothEndsText
    trimFirstStrs
    trimLastStrs
    trimBothEndsStrs
    strCount
    shellFileOpen
◇  ver 2015/08/12
・  追加
    WshShellを定義
◇  ver 2015/08/13
・  追加
    firstStrLastDelim/lastStrLastDelim
◇  ver 2017/03/12
・  修正
    firstStrFirstDelim/lastStrFirstDelim
    firstStrLastDelim/lastStrLastDelim
・  追加
    tagInnerText/tagOuterText
◇  ver 2017/03/16
・  isIncludeStr 追加
・  st_gas_gs.js 追加
◇  ver 2017/03/17
・  isNumber 追加
◇  ver 2017/04/13
・  getExtensionIncludePeriod 追加
◇  ver 2017/04/17
・  isUndefined/isNull/isNullOrUndefined 追加
・  st.jsからstsLib.jsにプロジェクト名変更
    ファイル名もst.jsからstslib_core.jsに変更
・  test_equalOperator stslib_test_web.htmlから
    stslib_core.jsに移動
・  assert 追加
・  arrayEqualArray/arrayIndexOfArray 追加
◇  ver 2017/04/18
・  startTagDelete/endTagDelete 追加
◇  ver 2017/04/19
・  deleteTagInnerText/deleteTagOutterText 追加
◇  ver 2017/04/20
・  stslib_win_wsh.js に shellFileOpen 移動
◇  ver 2017/04/22
・  degreeToRadian/radianToDegree 追加
・  angleRelative 追加
・  stslib_web.js に intervalLoop処理を追加
◇  ver 2017/04/25
・  名前空間を導入。関数群の名前がグローバル汚染を引き起こさないようにした。
・  全体的に名前空間に入るようにリファクタリング対応中
    isInclude/indexOfFirst/indexOfLast を追加
◇  ver 2017/04/26
・  Array.isArray を WSH 対応のために isArray で独自実装
・  stslib_win_wsh.js に string_LoadFromFile/getEncodingTypeName 追加
◇  ver 2017/04/27
・  インデントを2に変更
・  substrIndex/substrLength 追加
・  start/end 追加
◇  ver 2017/04/30
・  名前空間に移行するリファクタリング中
◇  ver 2017/05/13
・  名前空間のリファクタリング完了。
//----------------------------------------*/
